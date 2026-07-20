#!/usr/bin/env node
import { compileRdfToEyepl } from '../tools/rdf-to-eyepl.mjs';
import { extractEyeplRdf } from '../tools/eyepl-to-rdf.mjs';
import { run } from '../src/index.js';
import { TestReporter, isMainModule } from './test-style.mjs';

export function runRdfTools(reporter = new TestReporter()) {
  reporter.section('RDF tools');
  reporter.test('N-Quads survives an include-source round trip', () => {
    const input = '<https://example/s> <https://example/p> "chat"@fr <https://example/g> .\n_:a <https://example/value> "42"^^<http://www.w3.org/2001/XMLSchema#integer> .\n';
    const output = run(compileRdfToEyepl(input, { scope: 'doc', includeSource: true })).stdout;
    equal(extractEyeplRdf(output), '<https://example/s> <https://example/p> "chat"@fr <https://example/g> .\n_:e646f63_61 <https://example/value> "42"^^<http://www.w3.org/2001/XMLSchema#integer> .\n');
  });
  reporter.test('default mode emits only rule-derived quads', () => {
    const input = '<https://example/s> <https://example/parent> <https://example/o> .\n';
    const rules = 'rdf(S, iri("https://example/ancestor"), O, G) :- rdf(S, iri("https://example/parent"), O, G).';
    const output = run(compileRdfToEyepl(input, { rules })).stdout;
    equal(extractEyeplRdf(output), '<https://example/s> <https://example/ancestor> <https://example/o> .\n');
  });
  reporter.sectionTotal('RDF tool');
}
function equal(a, e) { if (a !== e) throw new Error(`expected ${JSON.stringify(e)}\nactual   ${JSON.stringify(a)}`); }
if (isMainModule(import.meta.url)) { const r = new TestReporter(); try { runRdfTools(r); r.totalLine(); } catch (_) { process.exit(1); } }
