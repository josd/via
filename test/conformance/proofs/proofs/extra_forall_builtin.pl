query(answer(X0)).
answer(forall_builtin) :- forall(member(X, [1, 2]), lt(X, 3)).
