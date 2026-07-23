% Angle-bracket and quoted spellings denote the same absolute IRI atom.
query(answer(X0)).
answer(ok) :- eq('<urn:example:a>', 'urn:example:a').
