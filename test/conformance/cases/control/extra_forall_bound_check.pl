query(answer(X0)).
answer(forall_bound_check) :- forall(member(X, [1, 2, 3]), lt(X, 4)).
