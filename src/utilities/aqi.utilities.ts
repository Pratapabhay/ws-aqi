export function value_to_className(val: number | null) {
  const z = val || 0;
  return (
    `z-` +
    (z > 0 && z <= 50
      ? "good"
      : z > 50 && z <= 100
      ? "satisfactory"
      : z > 100 && z <= 200
      ? "moderate"
      : z > 200 && z <= 300
      ? "poor"
      : z > 300 && z <= 400
      ? "very-poor"
      : "severe")
  );
}

export function formatTime(t: number) {
  const timeDiff = Math.round((new Date().valueOf() - t) / 1000);
  return timeDiff > 3600
    ? `${Math.round(timeDiff / 3600)} hr ago`
    : timeDiff > 60
    ? `${Math.round(timeDiff / 60)} mins ago`
    : `${timeDiff}s ago`;
}

interface Map {
  [key: string]: number[];
}

export const categories: Map = {
  good: [0, 50],
  satisfactory: [51, 100],
  moderate: [101, 200],
  poor: [201, 300],
  verypoor: [301, 400],
  severe: [401, 500],
};

export function parseCategory(item: string) {
  return item[0].toUpperCase() + item.substring(1);
}
