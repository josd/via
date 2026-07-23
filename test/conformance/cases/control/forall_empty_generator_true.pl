query(answer(X0)).
answer(ok) :- forall(missing(X), fail(X)).
