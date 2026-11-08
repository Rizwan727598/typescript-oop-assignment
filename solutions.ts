const multiplyValue = (value: number, multiplier?: number): number => {
  if (multiplier === undefined) {
    return value * 2;
  }

  return value * multiplier;
};

const processInput = (value: string | number | boolean): string | number => {
  if (typeof value === "string") {
    return value.trim().toLowerCase();
  } else if (typeof value === "number") {
    return value * 10;
  } else {
    return value ? "Active" : "Inactive";
  }
};

const formatCoordinate = (
  coordinate: readonly [number, number, string],
): string => {
  const [latitude, longitude, locationName] = coordinate;

  return `Location: ${locationName} (${latitude}, ${longitude})`;
};
