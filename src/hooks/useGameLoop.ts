import { useEffect, useRef, useState } from "react";
import type { Direction, GameState } from "../types";
import {
  moveSnake,
  checkCollision,
  spawnFood,
  initialGameState,
  getOppositeDirection,
} from "../utils/gameLogic";

export const useGameLoop = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const nextDirectionRef = useRef<Direction>(initialGameState.direction);

  const handleKeyPress = (e: KeyboardEvent) => {
    const keyMap: Record<string, Direction> = {
      ArrowUp: "UP",
      ArrowDown: "DOWN",
      ArrowLeft: "LEFT",
      ArrowRight: "RIGHT",
    };

    const newDir = keyMap[e.key];
    if (!newDir || gameState.isGameOver) return;

    e.preventDefault();

    if (getOppositeDirection(gameState.direction) !== newDir) {
      nextDirectionRef.current = newDir;
    }
  };

  const resetGame = () => {
    setGameState({
      ...initialGameState,
      food: spawnFood(initialGameState.snake),
    });
    nextDirectionRef.current = initialGameState.direction;
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState.direction, gameState.isGameOver]);

  useEffect(() => {
    if (gameState.isGameOver) return;

    const interval = setInterval(() => {
      setGameState((prev) => {
        const newHead = moveSnake(prev.snake[0], nextDirectionRef.current);

        if (checkCollision(newHead, prev.snake)) {
          return { ...prev, isGameOver: true };
        }

        const newSnake = [newHead, ...prev.snake];
        let newFood = prev.food;
        let newScore = prev.score;

        if (newHead.x === prev.food.x && newHead.y === prev.food.y) {
          newScore++;
          newFood = spawnFood(newSnake);
        } else {
          newSnake.pop();
        }

        return {
          ...prev,
          snake: newSnake,
          food: newFood,
          score: newScore,
          direction: nextDirectionRef.current,
        };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [gameState.isGameOver]);

  return { gameState, resetGame };
};
