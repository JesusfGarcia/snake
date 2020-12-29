import * as React from "react";
import { borderColition } from "../utils/borderColition";
import { bodyColition } from "../utils/bodyColition";

const initialState = {
  head: { top: 0, left: 30, direction: "right" },
  body: [
    { top: 0, left: 0 },
    { top: 0, left: 10 },
  ],
};

export default function Canvas() {
  const [snake, setSnake] = React.useState(initialState);
  const [food, setFood] = React.useState({ top: 30, left: 50 });
  const newCoordinate = () => {
    return {
      top: Math.floor(Math.random() * (60 - 0)) * 10,
      left: Math.floor(Math.random() * (60 - 0)) * 10,
    };
  };

  React.useEffect(() => {
    const interval = setTimeout(() => {
      let newHead;
      let newBody;
      const oldHeadCoords = {
        top: snake.head.top,
        left: snake.head.left,
      };
      switch (snake.head.direction) {
        case "right":
          newHead = {
            ...snake.head,
            left: snake.head.left + 10,
          };
          break;
        case "top":
          newHead = {
            ...snake.head,
            top: snake.head.top - 10,
          };
          break;
        case "bot":
          newHead = {
            ...snake.head,
            top: snake.head.top + 10,
          };
          break;
        case "left":
          newHead = {
            ...snake.head,
            left: snake.head.left - 10,
          };
        default:
          break;
      }

      newBody = snake.body.map((item, idx) => {
        if (idx === snake.body.length - 1) {
          return oldHeadCoords;
        } else {
          return snake.body[idx + 1];
        }
      });

      if (newHead.top === food.top && newHead.left === food.left) {
        newBody.unshift(snake.body[0]);
        setFood(newCoordinate);
      }

      const newSnake = {
        head: newHead,
        body: newBody,
      };

      if (borderColition(newHead) || bodyColition(newHead, newBody)) {
        setSnake(initialState);
      } else {
        setSnake(newSnake);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [snake]);

  const move = (e) => {
    e.preventDefault();
    const key = e.key;
    switch (key) {
      case "w":
        setSnake({
          ...snake,
          head: {
            ...snake.head,
            direction: "top",
          },
        });
        break;
      case "a":
        setSnake({
          ...snake,
          head: {
            ...snake.head,
            direction: "left",
          },
        });
        break;
      case "s":
        setSnake({
          ...snake,
          head: {
            ...snake.head,
            direction: "bot",
          },
        });
        break;
      case "d":
        setSnake({
          ...snake,
          head: {
            ...snake.head,
            direction: "right",
          },
        });
      default:
        break;
    }
  };
  return (
    <div tabIndex="0" onKeyDown={move} className="container">
      <div>
        <span>PUNTUACIÓN:</span>
        <span>{snake.body.length - 2}</span>
      </div>
      <div className="tablero">
        <div className="cuadrito" style={snake.head}></div>
        {snake.body.map((item, idx) => {
          return <div key={idx} className="cuadrito" style={item}></div>;
        })}
        <div className="food" style={food}></div>
      </div>
    </div>
  );
}
