export const borderColition = (snake) => {
  const headLeft = snake.left;
  const headTop = snake.top;
  if (headLeft >= 100 || headLeft < 0 || headTop >= 100 || headTop < 0) {
    return true;
  } else {
    return false;
  }
};
