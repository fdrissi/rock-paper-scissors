import { EPOSITION } from '../../../types';
import './styles.scss';

interface IProps {
  status: 'won' | 'lost';
  wonPosition: EPOSITION;
  market: string;
  odds: number;
  stake: number;
  wonAmount: number;
}

const Result = ({
  market,
  odds,
  stake,
  status,
  wonAmount,
  wonPosition,
}: IProps) => {
  return (
    <div className="result">
      <div className="position">{wonPosition}</div>
      <div className="info">
        <div className="market">{market}</div>
        <div className="details">
          <span>{odds}</span>
          <span className="sign">x</span>
          <span className="stake">{stake}$</span>
          <span className="amount-won">{wonAmount}$</span>{' '}
        </div>
      </div>
      <div className="status-won">{status}</div>
    </div>
  );
};

export default Result;
