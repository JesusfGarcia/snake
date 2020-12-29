export const borderColition = (snake) => {
  const headLeft = snake.left;
  const headTop = snake.top;
  if (headLeft >= 600 || headLeft < 0 || headTop >= 600 || headTop < 0) {
    return true;
  } else {
    return false;
  }
};
