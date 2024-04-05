/* eslint-disable no-case-declarations */
import { useReducer } from 'react';
import { E_POSITION, TBet, TGameConfig, TPosition } from '../../types';
import { findExistingSelectionIndex } from '../../lib/helpers';

export type TState = {
  bet: TBet[];
};

export type Action =
  | { type: 'ADD'; payload: TPosition }
  | { type: 'RESET' }
  | { type: 'INCREMENT'; payload: E_POSITION };

export function useBet(config: TGameConfig) {
  const [{ bet }, dispatch] = useReducer(reducer, { bet: [] });

  function reducer(state: TState, action: Action): TState {
    switch (action.type) {
      case 'ADD':
        const newBet: TBet = {
          selection: action.payload.name,
          stake: config.minStake,
        };
        return { ...state, bet: [...state.bet, newBet] };

      case 'INCREMENT':
        const existingBetIndex = findExistingSelectionIndex(
          state.bet,
          action.payload
        );

        const updatedBet = [...state.bet];
        updatedBet[existingBetIndex] = {
          ...updatedBet[existingBetIndex],
          stake: updatedBet[existingBetIndex].stake + config.stakeIncrementor,
        };

        return { ...state, bet: updatedBet };

      case 'RESET':
        return { ...state, bet: [] };

      default:
        return state;
    }
  }

  function addNewSelection(selection: TPosition) {
    dispatch({ type: 'ADD', payload: selection });
  }

  function incrementSelection(position: E_POSITION) {
    dispatch({ type: 'INCREMENT', payload: position });
  }

  function resetBets() {
    dispatch({ type: 'RESET' });
  }

  return {
    bet,
    addNewSelection,
    incrementSelection,
    resetBets,
  };
}
