export const foodColition = (body, coords) => {
  let itsOk = false;
  for (let i = 0; i < body.length; i++) {
    const piece = body[i];
    if (coords.top === piece.top && coords.left === piece.left) {
      itsOk = true;
      break;
    }
  }
  return itsOk;
};
