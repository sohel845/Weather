function convertKalToCels(value) {
  let celsius = 0;
  if (typeof value === 'number') {
    celsius = value - 273.15;
  } else {
    celsius = value.parseInt() - 273.15;
  }
  return Number.isInteger(celsius) && celsius % 1 === 0
    ? celsius
    : celsius.toFixed(1);
}

export {convertKalToCels};
