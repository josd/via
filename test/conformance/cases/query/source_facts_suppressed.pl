% query/1 prints derived answers, not source facts for the same predicate.
query(answer(X0)).
seed(a).
answer(source).
answer(X) :- seed(X).
