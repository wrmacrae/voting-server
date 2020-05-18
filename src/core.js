import {fromJS} from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', fromJS(entries));
}

export function next(state) {
  const pair = state.get('entries').take(2);
  const remainingEntries = state.get('entries').skip(2);
  return state.merge(fromJS({
  	vote: {'pair': pair},
  	entries: remainingEntries
  }));
}

export function vote(state, entry) {
  let votes = 0;
  if (state.get('vote').has('tally') &&
  	  state.get('vote').get('tally').has(entry)) {
    votes = state.get('vote').get('tally').get(entry);
  }
  return state.mergeDeep(fromJS({
  	vote: {
  		tally: {
  			[entry]: votes + 1
  		}
  	}
  }));
}