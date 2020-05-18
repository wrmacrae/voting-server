import {fromJS} from 'immutable';

export const INITIAL_STATE = fromJS({});

export function setEntries(state, entries) {
  return state.set('entries', fromJS(entries));
}

export function next(state) {
  const maxVotes = state.getIn(['vote', 'tally'], fromJS({0:0})).max();
  const winners = state.getIn(['vote', 'pair'], []).filter(contender =>
  	state.getIn(['vote', 'tally', contender], 0) == maxVotes);
  const entries = state.get('entries').concat(winners);
  if (entries.size === 1) {
  	return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  }
  return state.merge(fromJS({
  	vote: {
      pair: entries.take(2)
    },
  	entries: entries.skip(2)
  }));
}

export function vote(state, entry) {
  return state.updateIn(['tally', entry],
  	0,
  	tally => tally + 1
  );
}