export function calculatePending(
  needed: number,
  covered: number
) {
  return Math.max(
    needed - covered,
    0
  );
}