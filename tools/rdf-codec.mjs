// Lossless RDF/N-Quads <-> ordinary Eyepl term encoding.
export const XSD_STRING = 'http://www.w3.org/2001/XMLSchema#string';
export const RDF_LANG_STRING = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString';

export function parseNQuads(source, { scope = 'input' } = {}) {
  const quads = [];
  for (const [index, line] of String(source ?? '').split(/\r?\n/).entries()) {
    const s = new Scanner(line, index + 1, scope);
    s.space();
    if (s.end() || s.peek() === '#') continue;
    const subject = s.resource('subject'); s.requiredSpace();
    const predicate = s.iri(); s.requiredSpace();
    const object = s.object(); s.space();
    let graph = { kind: 'defaultGraph' };
    if (s.peek() !== '.') { graph = s.resource('graph'); s.space(); }
    s.expect('.'); s.space();
    if (!s.end() && s.peek() !== '#') s.fail('unexpected text after quad');
    quads.push({ subject, predicate, object, graph });
  }
  return quads;
}

export function quadToEyepl(q, predicate = 'rdf') {
  return `${predicate}(${toEyepl(q.subject)}, ${toEyepl(q.predicate)}, ${toEyepl(q.object)}, ${toEyepl(q.graph)}).`;
}

export function toEyepl(t) {
  if (t.kind === 'namedNode') return `iri(${quote(t.value)})`;
  if (t.kind === 'blankNode') return `bnode(${quote(t.scope)}, ${quote(t.value)})`;
  if (t.kind === 'defaultGraph') return 'default_graph';
  if (t.kind === 'literal') {
    const annotation = t.language ? `lang(${quote(t.language)})` : `datatype(${quote(t.datatype ?? XSD_STRING)})`;
    return `literal(${quote(t.value)}, ${annotation})`;
  }
  throw new Error(`unsupported RDF term kind: ${t?.kind ?? typeof t}`);
}

export function eyeplQuadToNQuad(term) {
  if (term?.type !== 'compound' || term.name !== 'rdf' || term.args.length !== 4) throw new Error('expected rdf/4 fact');
  const [subject, predicate, object, graph] = term.args.map(fromEyepl);
  if (!['namedNode', 'blankNode'].includes(subject.kind)) throw new Error('RDF subject must be an IRI or blank node');
  if (predicate.kind !== 'namedNode') throw new Error('RDF predicate must be an IRI');
  if (!['namedNode', 'blankNode', 'literal'].includes(object.kind)) throw new Error('invalid RDF object');
  if (!['namedNode', 'blankNode', 'defaultGraph'].includes(graph.kind)) throw new Error('invalid RDF graph');
  return `${toNQ(subject)} ${toNQ(predicate)} ${toNQ(object)}${graph.kind === 'defaultGraph' ? '' : ` ${toNQ(graph)}`} .`;
}

export function fromEyepl(t) {
  if (t?.type === 'atom' && t.name === 'default_graph') return { kind: 'defaultGraph' };
  if (compound(t, 'iri', 1)) return { kind: 'namedNode', value: scalar(t.args[0], 'IRI') };
  if (compound(t, 'bnode', 2)) return { kind: 'blankNode', scope: scalar(t.args[0], 'blank-node scope'), value: scalar(t.args[1], 'blank-node label') };
  if (compound(t, 'literal', 2)) {
    const value = scalar(t.args[0], 'literal');
    if (compound(t.args[1], 'lang', 1)) return { kind: 'literal', value, language: scalar(t.args[1].args[0], 'language').toLowerCase(), datatype: RDF_LANG_STRING };
    if (compound(t.args[1], 'datatype', 1)) return { kind: 'literal', value, language: '', datatype: scalar(t.args[1].args[0], 'datatype') };
    throw new Error('literal annotation must be lang/1 or datatype/1');
  }
  throw new Error(`term is not an RDF value: ${t?.name ?? typeof t}`);
}

function toNQ(t) {
  if (t.kind === 'namedNode') return `<${escapeIri(t.value)}>`;
  if (t.kind === 'blankNode') return `_:e${hex(t.scope)}_${hex(t.value)}`;
  if (t.kind === 'literal') {
    const q = `"${String(t.value).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r/g, '\\r').replace(/\n/g, '\\n')}"`;
    if (t.language) return `${q}@${t.language}`;
    return (t.datatype ?? XSD_STRING) === XSD_STRING ? q : `${q}^^<${escapeIri(t.datatype)}>`;
  }
  throw new Error(`cannot serialize ${t.kind}`);
}
function quote(v) { return `"${String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\t/g, '\\t')}"`; }
function escapeIri(v) { return String(v).replace(/[<>"{}|^`\\\u0000-\u0020]/g, (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`); }
function hex(v) { return Buffer.from(String(v), 'utf8').toString('hex'); }
function compound(t, name, arity) { return t?.type === 'compound' && t.name === name && t.args.length === arity; }
function scalar(t, label) { if (!t || !['atom', 'string', 'number'].includes(t.type)) throw new Error(`${label} must be a scalar`); return t.name; }

class Scanner {
  constructor(text, line, scope) { this.text = text; this.line = line; this.scope = scope; this.pos = 0; }
  peek() { return this.text[this.pos] ?? ''; }
  end() { return this.pos >= this.text.length; }
  space() { while (/[ \t]/.test(this.peek())) this.pos++; }
  requiredSpace() { const p = this.pos; this.space(); if (p === this.pos) this.fail('expected whitespace'); }
  expect(v) { if (!this.text.startsWith(v, this.pos)) this.fail(`expected ${JSON.stringify(v)}`); this.pos += v.length; }
  fail(m) { throw new Error(`N-Quads line ${this.line}, column ${this.pos + 1}: ${m}`); }
  resource(where) { if (this.peek() === '<') return this.iri(); if (this.text.startsWith('_:', this.pos)) return this.blank(); this.fail(`expected IRI or blank node for ${where}`); }
  iri() { this.expect('<'); let value = ''; while (!this.end() && this.peek() !== '>') value += this.character(true); if (this.end()) this.fail('unterminated IRI'); this.pos++; return { kind: 'namedNode', value }; }
  blank() { this.expect('_:'); const p = this.pos; while (/[A-Za-z0-9_.-]/.test(this.peek())) this.pos++; if (p === this.pos) this.fail('empty blank-node label'); return { kind: 'blankNode', scope: this.scope, value: this.text.slice(p, this.pos) }; }
  object() { return this.peek() === '"' ? this.literal() : this.resource('object'); }
  literal() {
    this.expect('"'); let value = '';
    while (!this.end() && this.peek() !== '"') value += this.character(false);
    if (this.end()) this.fail('unterminated literal'); this.pos++;
    let language = ''; let datatype = XSD_STRING;
    if (this.peek() === '@') { this.pos++; const p = this.pos; while (/[A-Za-z0-9-]/.test(this.peek())) this.pos++; language = this.text.slice(p, this.pos).toLowerCase(); if (!language) this.fail('empty language tag'); datatype = RDF_LANG_STRING; }
    else if (this.text.startsWith('^^', this.pos)) { this.pos += 2; datatype = this.iri().value; }
    return { kind: 'literal', value, language, datatype };
  }
  character(inIri) {
    const ch = this.peek(); this.pos++; if (ch !== '\\') return ch;
    const e = this.peek(); this.pos++;
    const simple = { t: '\t', b: '\b', n: '\n', r: '\r', f: '\f', '"': '"', "'": "'", '\\': '\\' };
    if (!inIri && Object.hasOwn(simple, e)) return simple[e];
    if (e === 'u' || e === 'U') { const n = e === 'u' ? 4 : 8; const h = this.text.slice(this.pos, this.pos + n); if (!new RegExp(`^[0-9A-Fa-f]{${n}}$`).test(h)) this.fail('invalid Unicode escape'); this.pos += n; return String.fromCodePoint(Number.parseInt(h, 16)); }
    this.fail(`invalid escape \\${e}`);
  }
}
