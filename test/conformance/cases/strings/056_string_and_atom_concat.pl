% Reference 9.6: str_concat/3 concatenates strings.
answer(string, X) :- str_concat("eye", "pl", X).
query(answer(X0, X1)).
