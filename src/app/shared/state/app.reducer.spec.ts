import { toggleSpinnerAction } from './app.action';
import * as appReducer from './app.reducer';

describe('App Reducer', () => {

  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };
      const { defaultState } = appReducer;

      const state = appReducer.appReducer(defaultState, action);

      expect(state).toBe(defaultState);
    });
  });

  describe('Toggle Spinner action', () => {
    it('should return the default state', () => {
      const { defaultState } = appReducer;

      const action = {
        type: 'toggleSpinnerAction',
      };
      const state = appReducer.appReducer(defaultState, action);

      expect(state).toBe(defaultState);
    });
    it('should return loading true', () => {
      const mockState = {
        loading: true,
      };

      const action = {
        type: 'toggleSpinnerAction',
      };
      const state = appReducer.appReducer(mockState, action);

      expect(state).toBe(mockState);
      expect(state.loading).toBe(true);
    });
    it('should return loading false', () => {
      const mockState = {
        loading: false,
      };

      const action = {
        type: 'toggleSpinnerAction',
      };
      const state = appReducer.appReducer(mockState, action);

      expect(state).toBe(mockState);
      expect(state.loading).toBe(false);
    });
  });
});
