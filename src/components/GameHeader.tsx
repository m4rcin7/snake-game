interface GameHeaderProps {
  score: number;
}

export const GameHeader = ({ score }: GameHeaderProps) => (
  <div className="header">
    <h1>SNAKE</h1>
    <div className="score">
      Score: <span>{score}</span>
    </div>
  </div>
);
