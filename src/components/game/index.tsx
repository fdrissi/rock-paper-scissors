import Card from '../ui/card';
import Button from '../ui/button';
import Result from '../ui/result';
import StatusBar from '../ui/status-bar';
import './styles.scss';
import { E_STATUS, TBet, TGameConfig, TPosition, TTicket } from '../../types';
import { useState } from 'react';
import { POSITIONS } from '../../constants';
import {
  canSelectPosition,
  findExistingSelectionIndex,
  sum,
} from '../../lib/helpers';
import { useBet } from './useBet';

interface IProps {
  config: TGameConfig;
  onPlay: (bet: TBet[]) => TTicket;
  getBalance: () => number;
}

function Game({ config, onPlay, getBalance }: IProps) {
  const { bet, addNewSelection, incrementSelection, resetBets } =
    useBet(config);
  const [ticket, setTicket] = useState<TTicket>();
  const [error, setError] = useState('');

  function handleSelectPosition(position: TPosition) {
    const existingSelectionIndex = findExistingSelectionIndex(
      bet,
      position.name
    );

    if (existingSelectionIndex !== -1) {
      handleExistingSelection(position);
    } else if (!canSelectMorePositions()) {
      setError(
        `Maximum allowed selections is ${config.maxAllowedNumberOfSelections}`
      );
    } else {
      handleAddNewSelection(position);
    }
  }

  function handleExistingSelection(position: TPosition) {
    if (hasEnoughBalance(config.stakeIncrementor)) {
      incrementSelection(position.name);
      setError('');
    } else {
      setError('No enough balance');
    }
  }

  function handleAddNewSelection(position: TPosition) {
    if (hasEnoughBalance(config.minStake)) {
      addNewSelection(position);
      setError('');
    } else {
      setError('No enough balance');
    }
  }

  function canSelectMorePositions(): boolean {
    return canSelectPosition(bet.length, config.maxAllowedNumberOfSelections);
  }

  function hasEnoughBalance(stake: number): boolean {
    const currentBalance = getBalance();
    const totalStake = sum(bet.map((selection) => selection.stake)) + stake;

    return currentBalance > totalStake;
  }

  function handleReset(e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e?.preventDefault();

    resetBets();
    setError('');
  }

  function handleSubmitBet(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    const response = onPlay(bet);
    setTicket(response);
    handleReset();
  }

  return (
    <div className="container">
      {/* status bar */}
      <StatusBar
        balance={getBalance()}
        bet={ticket?.totalStake}
        wonAmount={ticket?.wonAmount}
      />
      {/* result */}
      <section className="space-y-16 relative">
        <div className="space-y-2 tickets">
          {ticket?.results.map(
            ({
              amount,
              computerSelection,
              odd,
              playerSelection,
              stake,
              status,
            }) => (
              <Result
                key={`${computerSelection} vs ${playerSelection}`}
                match={`${computerSelection} vs ${playerSelection}`}
                odds={odd}
                stake={stake}
                status={status}
                wonAmount={amount}
                wonPosition={
                  status === E_STATUS.WON ? playerSelection : computerSelection
                }
              />
            )
          )}
        </div>

        {/* betting form */}
        <form className="space-y-16">
          <div className="relative cards-container space-y-4">
            <h1 className="title">Pick your position</h1>
            <div className="cards">
              {POSITIONS.map((position) => (
                <Card
                  key={position.name}
                  color={position.color}
                  stake={
                    bet.find(
                      (selection) => selection.selection === position.name
                    )?.stake
                  }
                  role="button"
                  onClick={() => handleSelectPosition(position)}
                >
                  {position.name}
                </Card>
              ))}
            </div>
            <p className="error">{error}</p>
          </div>
          <div className="action space-x-4">
            <Button variant="secondary" onClick={handleReset}>
              cancel
            </Button>
            <Button type="submit" variant="primary" onClick={handleSubmitBet}>
              Play
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Game;
