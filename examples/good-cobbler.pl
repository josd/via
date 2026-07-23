% Good cobbler, adapted from Eyeling's examples/good-cobbler.n3.
%
% The Eyeling result is a quoted assertion saying that joe is a good Cobbler.
% Here the quoted assertion is represented as a eyepl term.

% Output declarations: query/1 selects the relations written to this example's golden output.
query(is(X0, X1)).

% The asserted fact is kept separate from the output form so the rule can show
% how a quoted Eyeling assertion maps to an ordinary eyepl term.
assertedIs(joe, good(cobbler)).

% The single rule is intentionally simple: it preserves the subject and
% profession while wrapping the conclusion as is(X, good(Y)).
is(test, is(X, good(Y))) :-
  assertedIs(X, good(Y)).
