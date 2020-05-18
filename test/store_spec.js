import {expect} from 'chai';
import {fromJS} from 'immutable';

import makeStore from '../src/store';

describe('store', () => {

  it('is a Redux store with the reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(fromJS({}));

    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Inception', 'Frozen']
    });
    expect(store.getState()).to.equal(fromJS({
      entries: ['Inception', 'Frozen']
    }));
  });

});