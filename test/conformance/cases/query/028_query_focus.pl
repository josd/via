% Reference 10.2, 11: query/1 restricts selected default predicate groups.
query(answer(X0, X1)).
seed(a).
helper(X, y) :- seed(X).
answer(X, ok) :- helper(X, y).
