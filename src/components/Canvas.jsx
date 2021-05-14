import * as React from "react";
import { borderColition } from "../utils/borderColition";
import { bodyColition } from "../utils/bodyColition";
import { foodColition } from "../utils/foodColition";

import manguito from "../utils/maguito.png";

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
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [message, setMessage] = React.useState(false);

  const [position, setPosition] = React.useState(0);

  const diapos = [
    <div className="proposition">
      <p>Felicidades por llegar a los 22 pts! un muy buen número,</p>
      <p>
        Buenodespues de tanto pensar y pensar como hacer esto, me pareció
        bonito hacerlo con lo que más me gusta hacer...
      </p>
      <p>programar y pasar tiempo contigo amor</p>
      <p>
        sin mas preambulos da click en la palabra{" "}
        <span onClick={() => setPosition(1)}>continuar </span>
        si quieres saber lo que te tengo que decir :)
      </p>
    </div>,
    <div className="proposition">
      <p>¿Me harías el favor de ser mi novia?</p>
      <div className='button'>
        <span onClick={() => setPosition(2)}>Si, mi pollito</span>
      </div>
      <div className='button'>
        <span onClick={() => setPosition(3)}>No, soy un anfibio idiota</span>
      </div>
    </div>,
    <div className="start-title">
      Soy el hombre más feliz contigo amor, yo también quiero ser tu novio *-*
    </div>,
    <div className="start-title">jajajja un anfibio idiota :C</div>,
  ];

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

  const win = () => {
    if (score === 22) {
      setMessage(true);
      setIsPlaying(false);
    }
  };

  React.useEffect(() => {
    if (isPlaying) {
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
          setScore(score + 1);
        }

        const newSnake = {
          head: newHead,
          body: newBody,
        };

        if (borderColition(newHead) || bodyColition(newHead, newBody)) {
          setSnake(initialState);
          setIsPlaying(false);
        } else {
          setSnake(newSnake);
        }
      }, refreshTime);

      return () => clearInterval(interval);
    }
  }, [snake, isPlaying]);

  React.useEffect(() => {
    win();
  }, [score]);

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

  const startNewGame = () => {
    setIsPlaying(true);
    setScore(0);
  };

  return (
    <div tabIndex="0" onKeyDown={move} className="container">
      <div className="score">
        <span>score: </span>
        <span>{score}</span>
      </div>
      <div className="tablero">
        {isPlaying ? (
          <>
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
            <img
              className="food"
              src={manguito}
              style={{
                top: `${food.top}%`,
                left: `${food.left}%`,
                width: `${squareLong}%`,
                height: `${squareLong}%`,
              }}
            />
          </>
        ) : message ? (
          <>{diapos[position]}</>
        ) : (
          <div className="start-title" onClick={startNewGame}>
            start
          </div>
        )}
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
