import Card from '../ui/card';
import Button from '../ui/button';
import Result from '../ui/result';
import StatusBar from '../ui/status-bar';
import './styles.scss';
import { EPOSITION } from '../../types';

type TPosition = {
  color: 'red' | 'green' | 'blue';
  text: EPOSITION;
  bet?: number;
};

const POSITIONS: TPosition[] = [
  {
    color: 'red',
    text: EPOSITION.SCISSORS,
    bet: 500,
  },
  {
    color: 'green',
    text: EPOSITION.PAPER,
    bet: 1500,
  },
  {
    color: 'blue',
    text: EPOSITION.ROCK,
  },
];

function Game() {
  console.log('Game');
  return (
    <div className="container">
      {/* status bar */}
      <StatusBar balance={5000} bet={500} wonAmount={1500} />
      {/* result */}
      <section className="space-y-16">
        <Result
          market="Rock vs Paper"
          odds={15}
          stake={500}
          status="won"
          wonAmount={15000}
          wonPosition={EPOSITION.ROCK}
        />
        {/* betting form */}
        <form className="space-y-16">
          <div className="space-y-4">
            <h1 className="title">Pick your position</h1>
            <div className="cards">
              {POSITIONS.map((position) => (
                <Card
                  key={position.text}
                  color={position.color}
                  bet={position?.bet}
                >
                  {position.text}
                </Card>
              ))}
            </div>
          </div>
          <div className="action">
            <Button variant="primary">Play</Button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Game;
