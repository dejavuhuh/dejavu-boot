function lastOf(array: Array<any>) {
  return array.length > 0 ? array[array.length - 1] : null;
}

export const Arrays = {
  lastOf,
};
