const randBetween = ([min, max] = [1, 10]) => Math.floor(Math.random() * (max - min + 1)) + min;

export { randBetween };
