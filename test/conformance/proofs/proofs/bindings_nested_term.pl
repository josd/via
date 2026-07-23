% Reference 12: proof bindings preserve nested compound terms.
query(answer(X0)).
source(pair(a, [b, c])).
answer(Term) :- source(Term).
