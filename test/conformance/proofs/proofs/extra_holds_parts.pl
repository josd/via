query(answer(X0, X1, X2)).
answer(holds_parts, Name, Args) :- holds((alpha, beta(2)), Name, Args).
