% Integer-preserving unary arithmetic.
query(answer(X0, X1)).
answer(neg, X) :- neg(7, X).
answer(abs, X) :- abs(-7, X).
