export const roundToTwoDecimals = (num: number) => {
  return Number((Math.round(num * 100) / 100).toFixed(2));
};

export const stripeNoDecimalAmount = (num: number) => {
  return ((Math.round(num * 100) / 100) * 100).toFixed(0);
};
