export function isNotNumber(arg: unknown | string) {
  if (Number.isNaN(Number(arg)) || arg === '') {
    return true;
  } else {
    return false;
  }
}
