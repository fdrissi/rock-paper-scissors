import { TBet, E_POSITION } from '../types';

export function canSelectPosition(
  selectedPositionsCount: number,
  maxAllowedSelection: number
) {
  return selectedPositionsCount <  maxAllowedSelection;
}

export function findExistingSelectionIndex(
  bet: TBet[],
  selectionName: E_POSITION
): number {
  return bet.findIndex(({ selection }) => selection === selectionName);
}

export function sum(numbers: number[]) {
    return numbers.reduce((total, num) => total + num, 0);
}
