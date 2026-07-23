query(answer(X0, X1, X2)).
answer(Name, Left, Right) :- holds((edge(a, b), label(a, "A")), Name, [Left, Right]).
