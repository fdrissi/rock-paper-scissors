export enum E_POSITION {
  ROCK = 'rock',
  SCISSORS = 'scissors',
  PAPER = 'paper',
}

export enum E_STATUS {
  WON = 'won',
  LOST = 'lost',
  TIE = 'tie'
}

export type TPosition = {
  color: 'red' | 'green' | 'blue';
  name: E_POSITION;
};

export type TGameConfig = {
  baseBalance: number;
  maxAllowedNumberOfSelections: number;
  minStake: number;
  stakeIncrementor: number;
  odds: [number, number];
  tieOdds: [number, number];
};

export type TBet = {
  selection: E_POSITION;
  stake: number;
};

export type TTicket = {
  results: TResult[];
  totalStake: number;
  wonAmount: number;
};

export type TResult = {
  playerSelection: E_POSITION;
  stake: number;
  status: E_STATUS;
  odd: number;
  amount: number;
  computerSelection: E_POSITION;
}
