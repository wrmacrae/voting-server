import {expect} from 'chai';
import {fromJS} from 'immutable';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('puts entries in the state', () => {
      const state = fromJS({});
      const entries = ['Inception', 'Shutter Island']
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(fromJS({
        entries: entries
      }));
    });

  });

  describe('next', () => {

    it('moves the next two entries into a vote', () => {
      const state = fromJS({
        'entries': ['Inception', 'Shutter Island', 'The Sixth Sense']
      });
      const nextState = next(state)
      expect(nextState).to.equal(fromJS({
        entries: ['The Sixth Sense'],
        vote: {
          pair: ['Inception', 'Shutter Island']
        }
      }));
    });

    it('keeps winner of previous vote', () => {
      const state = fromJS({
        vote: {
          pair: ['Inception', 'Shutter Island'],
          tally: {
            Inception: 5,
            'Shutter Island': 1
          }
        },
        entries: ['Frozen', 'Onward', 'Get Out']
      });
      const nextState = next(state);
      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Frozen', 'Onward']
        },
        entries: ['Get Out', 'Inception']
      }));
    });

    it('keeps tied entries', () => {
      const state = fromJS({
        vote: {
          pair: ['Inception', 'Shutter Island'],
          tally: {
            Inception: 3,
            'Shutter Island': 3
          }
        },
        entries: ['Frozen', 'Onward']
      });
      const nextState = next(state);
      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Frozen', 'Onward']
        },
        entries: ['Inception', 'Shutter Island']
      }));
    });

    it('declares a winner on the last entry', () => {
      const state = fromJS({
        vote: {
          pair: ['Inception', 'Shutter Island'],
          tally: {
            Inception: 4,
            'Shutter Island': 3
          }
        },
        entries: []
      });
      const nextState = next(state);
      expect(nextState).to.equal(fromJS({
        winner: 'Inception'
      }));
    });

  });

  describe('vote', () => {

    it('creates a tally for entry with 0 votes', () => {
      const state = fromJS({
        'pair': ['Inception', 'Shutter Island']
      });
      const nextState = vote(state, 'Inception');
      expect(nextState).to.equal(fromJS({
        'pair': ['Inception', 'Shutter Island'],
        'tally': {
          'Inception': 1
        }
      }));
    });

    it('Increments tallies for entries with votes', () => {
      const state = fromJS({
        pair: ['Inception', 'Shutter Island'],
        tally: {
          Inception: 1,
          'Shutter Island': 5
        }
      });
      const nextState = vote(state, 'Inception');
      expect(nextState).to.equal(fromJS({
        pair: ['Inception', 'Shutter Island'],
        tally: {
          Inception: 2,
          'Shutter Island': 5
        }
      }));
    });

  });

});
