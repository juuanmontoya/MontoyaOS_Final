export function calculateProgress(
  needed: number,
  covered: number
) {
  if (needed <= 0) {
    return 0;
  }

  return Math.min(
    (covered / needed) * 100,
    100
  );
}