export function value_to_className(val: number | null) {
  const z = val || 0;
  return (
    `z-` +
    (z > 0 && z < 50
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
  const timeDiff = new Date().valueOf() - t;
  return timeDiff > 3600
    ? `${Math.round(timeDiff / 3600)} hr ago`
    : timeDiff > 60
    ? `${Math.round(timeDiff / 60)} mins ago`
    : `${timeDiff}s ago`;
}