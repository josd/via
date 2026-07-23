query(answer(X0)).
helper(a).
helper(b).
answer(X) :- helper(X).
answer(X) :- helper(X), eq(X, c).
