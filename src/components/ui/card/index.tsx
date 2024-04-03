import './styles.scss';

interface Props {
  color: 'green' | 'red' | 'blue';
  bet?: number;
  children: React.ReactNode;
}

const Card = ({ color, bet, children }: Props) => {
  return (
    <div className={`card-${color}`}>
      {bet && <div className="bet">{bet}</div>}
      <div className="label">{children}</div>
    </div>
  );
};

export default Card;
