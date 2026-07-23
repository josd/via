% Annotation with quoted formula data.
%
% The program keeps the annotation as data and derives visible relations from it.
% Context members become default output only when explicit rules project them.

% Output declarations: query/1 selects the relations written to this example's golden output.
query(name(X0, X1)).
query(log_nameOf(X0, X1)).
query(statedBy(X0, X1)).
query(recorded(X0, X1)).

% Program structure: facts set up the scenario, and rules derive the queried conclusions.
annotation(t, (
  name(a, "Alice"),
  statedBy(t, bob),
  recorded(t, "2021-07-07")
)).

% Derivation rules: each rule below contributes one logical step toward the displayed results.
name(S, O) :-
  annotation(_t, Context),
  holds(Context, name(S, O)).

log_nameOf(T, name(S, O)) :-
  annotation(T, Context),
  holds(Context, name(S, O)).

statedBy(S, O) :-
  annotation(_t, Context),
  holds(Context, statedBy(S, O)).

recorded(S, O) :-
  annotation(_t, Context),
  holds(Context, recorded(S, O)).
