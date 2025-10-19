interface GameControlsProps {
  onRestart: () => void;
}

export const GameControls = ({ onRestart }: GameControlsProps) => (
  <button onClick={onRestart} className="restart-btn">
    Restart
  </button>
);
