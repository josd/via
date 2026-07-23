query(answer(X0, X1)).
answer(Name, Args) :- compound_name_arguments('<urn:example:a>', Name, Args).
