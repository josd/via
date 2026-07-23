query(answer(X0)).
p(a) :- q(a).
q(a) :- r(a).
r(a) :- not(p(a)).
seed(ok).
answer(X) :- seed(X).
