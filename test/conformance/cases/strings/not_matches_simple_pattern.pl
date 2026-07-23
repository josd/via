query(answer(X0)).
answer(ok) :- not_matches("abc", "x|y").
