
import * as featureReducer from './feature.reducer';

describe('App Reducer', () => {

    describe('unknown action', () => {
        it('should return the default state', () => {
          const { defaultState } = featureReducer;
          const action = {
            type: 'Unknown',
          };
          const state = featureReducer.featureReducer(defaultState, action);
     
          expect(state).toBe(defaultState);
        });
      });
});
