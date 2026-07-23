query(answer(X0)).
item(a).
item(b).
good(a).
answer(ok) :- not(forall(item(X), good(X))).
