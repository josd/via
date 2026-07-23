% Reference 9.6: matches/3 extracts named regular-expression captures into a context.
query(answer(X0, X1, X2)).

line("event=login_failed user=alice trace=4bf92f3577b34da6a3ce929d0e0e4736").
pattern("^event=(?<event>\\w+) user=(?<user>\\w+) trace=(?<trace_id>[0-9a-f]{32})$").

answer(User, Event, Traceid) :-
  line(Text),
  pattern(Pattern),
  matches(Text, Pattern, Context),
  holds(Context, event(Event)),
  holds(Context, user(User)),
  holds(Context, trace_id(Traceid)).
