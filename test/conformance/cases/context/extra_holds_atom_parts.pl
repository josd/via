query(answer(X0, X1, X2)).
answer(holds_atom_parts, Name, Args) :- holds((ready, box(a)), Name, Args).
