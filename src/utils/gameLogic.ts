import type { Point, Direction, GameState } from "../types";

export const GRID_SIZE = 20;
export const CELL_SIZE = 20;

export const getOppositeDirection = (dir: Direction): Direction => {
  const opposites: Record<Direction, Direction> = {
    UP: "DOWN",
    DOWN: "UP",
    LEFT: "RIGHT",
    RIGHT: "LEFT",
  };
  return opposites[dir];
};

export const moveSnake = (head: Point, direction: Direction): Point => {
  const newHead = { ...head };
  switch (direction) {
    case "UP":
      newHead.y--;
      break;
    case "DOWN":
      newHead.y++;
      break;
    case "LEFT":
      newHead.x--;
      break;
    case "RIGHT":
      newHead.x++;
      break;
  }
  return newHead;
};

export const checkCollision = (head: Point, snake: Point[]): boolean => {
  if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
    return true;
  }
  return snake.some((seg) => seg.x === head.x && seg.y === head.y);
};

export const spawnFood = (snake: Point[]): Point => {
  let food: Point;
  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some((seg) => seg.x === food.x && seg.y === food.y));
  return food;
};

export const initialGameState: GameState = {
  snake: [{ x: 10, y: 10 }],
  food: { x: 15, y: 15 },
  direction: "RIGHT",
  score: 0,
  isGameOver: false,
};
