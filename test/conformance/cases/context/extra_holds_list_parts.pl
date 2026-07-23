query(answer(X0, X1, X2)).
answer(holds_list_parts, Name, Args) :- holds(([a, b], tail), Name, Args).
