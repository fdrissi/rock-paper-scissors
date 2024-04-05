import './styles.scss';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  color: 'green' | 'red' | 'blue';
  stake?: number;
  children: React.ReactNode;
}

const Card = ({ color, stake, children, ...props }: IProps) => {
  return (
    <div className={`card-${color}`} {...props}>
      {stake && <div className="stake">{stake}</div>}
      <div className="label">{children}</div>
    </div>
  );
};

export default Card;
