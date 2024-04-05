import { E_POSITION, E_STATUS } from '../../../types';
import './styles.scss';

interface IProps {
  status: E_STATUS.WON | E_STATUS.LOST | E_STATUS.TIE;
  wonPosition: E_POSITION;
  match: string;
  odds: number;
  stake: number;
  wonAmount: number;
}

const Result = ({
  match,
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
        <div className="match">{match}</div>
        <div className="details">
          <span>{odds}</span>
          <span className="sign">x</span>
          <span className="stake">{stake}$</span>
          <span className={`amount-${status}`}>{wonAmount}$</span>{' '}
        </div>
      </div>
      <div className={`status-${status}`}>{status}</div>
    </div>
  );
};

export default Result;
