query(answer(X0)).
answer(X) :- compound_name_arguments(X, pair, [a, b]).
