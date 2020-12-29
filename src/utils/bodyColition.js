export const bodyColition = (head, body) => {
  let isColition = false;

  for (let i = 0; i < body.length; i++) {
    let actualBody = body[i];
    if (head.top === actualBody.top && head.left === actualBody.left) {
      isColition = true;
      break;
    }
  }
  return isColition;
};
