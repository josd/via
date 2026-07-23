% The empty list is a first-class term.
query(answer(X0)).
seed([]).
answer(X) :- seed(X).
