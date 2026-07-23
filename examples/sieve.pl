% Prime enumeration inspired by Eyelet input/sieve.pl.
% The 1000-limit answer matches Eyelet output-swipl/sieve.pl.
%
% eyepl uses the built-in smallest_divisor_from/3 relation to keep the
% example fast while preserving the same generated prime list.

% Output declarations: query/1 selects the relations written to this example's golden output.
query(primes(X0, X1)).

% Program structure: facts set up the scenario, and rules derive the queried conclusions.
want_primes(1000).

% Derivation rules: each rule below contributes one logical step toward the displayed results.
prime_under(Limit, P) :-
  between(2, Limit, P),
  smallest_divisor_from(P, 2, P).

primes(Limit, Ps) :-
  want_primes(Limit),
  findall(P, prime_under(Limit, P), Ps).
