export const shuffle = (array) => {
  for (let iterator = array.length - 1; iterator > 0; iterator--) {
    const position = Math.floor(Math.random() * (iterator + 1));
    [array[iterator], array[position]] = [array[position], array[iterator]];
  }
  return array
}
