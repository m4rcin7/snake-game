import { useEffect, useRef } from "react";
import type { GameState } from "../types";
import { GRID_SIZE, CELL_SIZE } from "../utils/gameLogic";

interface CanvasProps {
  gameState: GameState;
}

export const Canvas = ({ gameState }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;

    // Clear canvas
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    gameState.snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? "#4ade80" : "#22c55e";
      ctx.fillRect(
        seg.x * CELL_SIZE,
        seg.y * CELL_SIZE,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
    });

    // Draw food
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(
      gameState.food.x * CELL_SIZE,
      gameState.food.y * CELL_SIZE,
      CELL_SIZE - 2,
      CELL_SIZE - 2
    );

    // Game over overlay
    if (gameState.isGameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#fff";
      ctx.font = "bold 24px monospace";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
    }
  }, [gameState]);

  return (
    <canvas
      ref={canvasRef}
      width={GRID_SIZE * CELL_SIZE}
      height={GRID_SIZE * CELL_SIZE}
      className="game-canvas"
    />
  );
};
