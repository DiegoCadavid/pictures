const divideArray = <T>(arr: Array<T>, divisions = 2): Array<Array<T>> => {
  const result: Array<Array<T>> = [];
  for (let i = 0; i < divisions; i++) {
    result[i] = [];
  }

  let pos = 0;
  for (let i = 0; i < arr.length; i++) {
    (result[pos] as Array<T>).push(arr[i] as T);
    pos = (pos + 1) % divisions;
  }

  return result;
};

export default divideArray;
