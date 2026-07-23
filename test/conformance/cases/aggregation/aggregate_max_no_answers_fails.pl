query(answer(X0)).
answer(ok) :- not(aggregate_max(Key, Value, missing(Value), BestKey, BestValue)).
