import {expect} from 'chai';
import {fromJS} from 'immutable';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('has an initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Inception']};
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Inception']
    }));
  });

  it('handles SET_ENTRIES', () => {
    const state = fromJS({});
    const action = {type: 'SET_ENTRIES', entries: ['Inception']};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Inception']
    }));
  });

  it('handles NEXT', () => {
    const state = fromJS({
      entries: ['Inception', 'Frozen']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Inception', 'Frozen']
      },
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const state = fromJS({
      vote: {
        pair: ['Inception', 'Frozen']
      }
    });
    const action = {type: 'VOTE', entry: 'Inception'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Inception', 'Frozen'],
        tally: {
          Inception: 1
        }
      }
    }));
  });

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Inception', 'Shutter Island', 'The Sixth Sense']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Inception'},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Inception'},
      {type: 'NEXT'}
    ];
    const state = actions.reduce(reducer, undefined);

    expect(state).to.equal(fromJS({
      winner: 'Inception'
    }));
  });
});