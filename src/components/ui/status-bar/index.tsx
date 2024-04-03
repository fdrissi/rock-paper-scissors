import './styles.scss';

interface IProps {
  balance: number;
  bet?: number;
  wonAmount?: number;
}

const StatusBar = ({ balance, bet, wonAmount }: IProps) => {
  return (
    <div className="status-bar">
      <div>
        <span className="label">Balance: </span>
        {balance}
      </div>
      <div>
        <span className="label">Bet: </span>
        {bet}
      </div>
      <div>
        <span className="label">Win: </span>
        {wonAmount}
      </div>
    </div>
  );
};

export default StatusBar;
