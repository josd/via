% `_name` is a named variable and must be reused within a clause.
query(answer(X0)).
pair(a, a).
pair(a, b).
answer(_value) :- pair(_value, _value).
