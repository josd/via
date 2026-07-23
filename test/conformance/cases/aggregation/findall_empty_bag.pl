query(answer(X0)).
answer(Bag) :- findall(X, missing(X), Bag).
