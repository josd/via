query(answer(X0)).
p(a) :- helper(a).
helper(a) :- not(q(a)).
q(a) :- p(a).
answer(ok).
