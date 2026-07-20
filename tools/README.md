# RDF round-trip tools

These dependency-free tools translate N-Quads into ordinary Eyepl and
materialized `rdf/4` facts back into N-Quads. Eyepl remains RDF-agnostic.

```bash
node tools/rdf-to-eyepl.mjs --rules rules.pl data.nq -o program.pl
node bin/eyepl.js program.pl > derived.pl
node tools/eyepl-to-rdf.mjs derived.pl -o derived.nq
```

Use `--include-source` when the result should contain input and derived quads.
Without it, the pipeline emits only derived quads. The lossless encoding uses
`iri/1`, scoped `bnode/2`, `literal/2`, and `default_graph`.

Rules currently use ordinary Eyepl `rdf/4`. An SRL front end can compile to
that contract without changing these tools or Eyepl. The reader accepts
N-Triples and N-Quads; richer RDF syntaxes should first be converted by a
dedicated RDF parser.
