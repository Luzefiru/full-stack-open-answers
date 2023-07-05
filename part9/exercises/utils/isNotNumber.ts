export function isNotNumber(arg: unknown) {
  if (Number.isNaN(Number(arg))) {
    return true;
  } else {
    return false;
  }
}
