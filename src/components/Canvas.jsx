import * as React from "react";
import { borderColition } from "../utils/borderColition";
import { bodyColition } from "../utils/bodyColition";
import { foodColition } from "../utils/foodColition";

const squareLong = 5;
const refreshTime = 200;
const initialState = {
  head: { top: 0, left: 10, direction: "right" },
  body: [
    { top: 0, left: 0 },
    { top: 0, left: squareLong },
  ],
};

export default function Canvas() {
  const [snake, setSnake] = React.useState(initialState);
  const [food, setFood] = React.useState({ top: 30, left: 50 });

  const newCoordinate = () => {
    let newCoords;
    do {
      newCoords = {
        top: Math.floor(Math.random() * (20 - 0)) * squareLong,
        left: Math.floor(Math.random() * (20 - 0)) * squareLong,
      };
    } while (foodColition(snake.body, newCoords));
    return newCoords;
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
            left: snake.head.left + squareLong,
          };
          break;
        case "top":
          newHead = {
            ...snake.head,
            top: snake.head.top - squareLong,
          };
          break;
        case "bot":
          newHead = {
            ...snake.head,
            top: snake.head.top + squareLong,
          };
          break;
        case "left":
          newHead = {
            ...snake.head,
            left: snake.head.left - squareLong,
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
    }, refreshTime);

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

  const touchMove = (key) => {
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
      <div className="tablero">
        <div
          className="cuadrito"
          style={{
            top: `${snake.head.top}%`,
            left: `${snake.head.left}%`,
            width: `${squareLong}%`,
            height: `${squareLong}%`,
          }}
        ></div>
        {snake.body.map((item, idx) => {
          return (
            <div
              key={idx}
              className="cuadrito"
              style={{
                top: `${item.top}%`,
                left: `${item.left}%`,
                width: `${squareLong}%`,
                height: `${squareLong}%`,
              }}
            ></div>
          );
        })}
        <div
          className="food"
          style={{
            top: `${food.top}%`,
            left: `${food.left}%`,
            width: `${squareLong}%`,
            height: `${squareLong}%`,
            borderRadius: `${100}%`,
          }}
        ></div>
      </div>
      <div className="controls">
        <div onClick={() => touchMove("w")} className="vertical">
          ↑
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <div onClick={() => touchMove("a")}>←</div>
          <div onClick={() => touchMove("d")}>→</div>
        </div>

        <div onClick={() => touchMove("s")} className="vertical">
          ↓
        </div>
      </div>
    </div>
  );
}

/* <div>
        <span>PUNTUACIÓN:</span>
        <span>{snake.body.length - 2}</span>
      </div> */
