# The Eyepl Position

Eyepl is a small reasoning language for turning facts and rules into answers
and inspectable proofs.

Its syntax is familiar to Prolog users, but Eyepl is not intended to become a
complete ISO Prolog implementation. It deliberately focuses on the declarative
core: relations, unification, finite search, recursion, lists, arithmetic,
aggregation, and structured terms.

Eyepl's position is that a reasoning language should remain understandable as
a whole. Programs should state relationships directly, while the engine
handles indexing, automatic tabling, recursion, and materialization without
requiring procedural search directives.

Proofs are part of the result, not an afterthought. Derived conclusions can
carry machine-readable explanations that trace them back to facts, rules,
bindings, and built-in operations.

Eyepl is RDF-agnostic at its core while supporting lossless RDF 1.2
interchange. Standard RDF documents can be translated into ordinary `rdf/4`
facts, reasoned over using compact Eyepl rules, and serialized back to RDF
without losing nested triple terms, directional literals, named graphs, or
blank-node identity.

Eyepl values:

- a small and stable language;
- declarative rules over procedural control;
- predictable and reproducible execution;
- automatic support for recursive reasoning;
- inspectable answers and proofs;
- standards-based data interchange;
- performance without sacrificing clarity.

Eyepl will adopt features selectively when they solve demonstrated reasoning
problems and fit this model. It will not pursue completeness merely to
reproduce the full procedural environment of traditional Prolog systems.

The goal is not to be the largest logic language. The goal is to provide the
smallest coherent language that is sufficient for practical, evidence-backed
reasoning.
