% Reference 11.2 and 13: query/1 can select several predicate arities explicitly.
query(answer(X0)).
query(answer(X0, X1)).
seed(a).
seed(b).
answer(X) :- seed(X).
answer(X, doubled) :- seed(X).
answer(hidden, X, Y) :- seed(X), seed(Y).
