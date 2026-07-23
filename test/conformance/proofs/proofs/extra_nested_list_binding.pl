query(answer(X0, X1)).
answer(nested_list_binding, Tail) :- eq([a, b | Tail], [a, b, c]).
