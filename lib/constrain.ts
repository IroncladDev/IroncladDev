export const constrain = (num: number, min: number, max: number) => {
  if (num < min) return min;
  else if (num > max) return max;
  else return num;
};
