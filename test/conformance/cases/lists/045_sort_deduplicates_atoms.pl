% Reference 9.8: sort/2 sorts and deduplicates a proper list.
answer(sorted, X) :- sort([c, a, b, a], X).
query(answer(X0, X1)).
