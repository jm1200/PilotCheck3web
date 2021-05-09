export const options = (length: number) => {
  const optArr = [];
  if (length === 0) {
    return [
      <option key={0} value={0}>
        {0}
      </option>,
    ];
  }
  for (let i = 0; i < length; i++) {
    optArr.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  return optArr;
};
