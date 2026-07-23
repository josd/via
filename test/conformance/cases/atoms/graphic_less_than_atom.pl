% A lone graphic < remains a graphic atom, not an IRI opener.
query(answer(X0)).
seed(<).
answer(X) :- seed(X).
