% compound_name_arguments/3 observes atoms as name plus empty argument list.
query(answer(X0, X1)).
answer(Name, Args) :- compound_name_arguments(nil, Name, Args).
