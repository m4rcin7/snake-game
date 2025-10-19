import { Canvas } from "./components/Canvas";
import { GameHeader } from "./components/GameHeader";
import { GameControls } from "./components/GameControls";
import { useGameLoop } from "./hooks/useGameLoop";
import "./App.css";

function App() {
  const { gameState, resetGame } = useGameLoop();

  return (
    <div className="container">
      <GameHeader score={gameState.score} />
      <Canvas gameState={gameState} />
      <GameControls onRestart={resetGame} />
    </div>
  );
}

export default App;
