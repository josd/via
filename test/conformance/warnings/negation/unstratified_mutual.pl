% Warnings report unstratified negation without changing normal execution.
query(answer(X0)).
p(a) :- not(q(a)).
q(a) :- not(p(a)).
answer(ok).
