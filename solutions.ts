const multiplyValue = (value: number, multiplier?: number): number => {
  if (multiplier === undefined) {
    return value * 2;
  }

  return value * multiplier;
};
console.log(multiplyValue(10));
console.log(multiplyValue(10, 5));
console.log(multiplyValue(7, 0));
