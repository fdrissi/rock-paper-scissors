import { sum } from '../lib/helpers';
import { E_POSITION, TTicket, TBet, TGameConfig, E_STATUS, TResult } from '../types';

const POSITIONS = [E_POSITION.PAPER, E_POSITION.ROCK, E_POSITION.SCISSORS];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function updateBalance(results: TResult[], balance: number): number {
  results.forEach(res => {
    if (res.status === E_STATUS.WON) {
      balance += res.amount - res.stake;
    } else if (res.status === E_STATUS.LOST) {
      balance -= res.stake;
    }
  });
  return balance;
}

function determineSelectionResult(
  player: E_POSITION,
  computer: E_POSITION,
  tieOdds: number,
  odd: number
) {
  const winningChoices = {
    [E_POSITION.SCISSORS]: E_POSITION.PAPER,
    [E_POSITION.ROCK]: E_POSITION.SCISSORS,
    [E_POSITION.PAPER]: E_POSITION.ROCK,
  };

  if (player === computer) {
    return {
      status: tieOdds > 0 ? E_STATUS.TIE : E_STATUS.LOST,
      odd: tieOdds,
    };
  }

  if (winningChoices[player] === computer) {
    return {
      status: E_STATUS.WON,
      odd,
    };
  }
  
  return {
    status: E_STATUS.LOST,
    odd: 0,
  };
}

export function startGame(gameConfig: TGameConfig) {
  const { baseBalance, ...config } = gameConfig;
  let balance = baseBalance;

  return {
    play: (bet: TBet[]): TTicket => {
      const computerSelection = POSITIONS[getRandomInt(3)];
      const totalStake = sum(bet.map((selection) => selection.stake));
      const odd = config.odds[bet.length - 1];
      const tieOdds = config.tieOdds[bet.length - 1];

      const results = bet.map((bet) => {
        const selectionResult = determineSelectionResult(
          bet.selection,
          computerSelection,
          tieOdds,
          odd
        );

        return {
          playerSelection: bet.selection,
          stake: bet.stake,
          status: selectionResult.status,
          odd: selectionResult.odd,
          amount: bet.stake * selectionResult.odd,
          computerSelection,
        };
      });

      const newBalance =  updateBalance(results, balance)
      const wonAmount = newBalance - balance;
      balance = newBalance

      return {
        results,
        totalStake,
        wonAmount: wonAmount
      };
    },
    getBalance: () => balance,
  };
}
