export function setupCounter() {
  const countMap = {};

  const increase = ({ productId }) => {
    if (countMap[productId] === undefined) {
      countMap[productId] = 0;
    }
    countMap[productId] += 1;
    return countMap[productId];
  };

  const decrease = ({ productId }) => {
    if (countMap[productId] === undefined) {
      countMap[productId] = 0;
    }
    countMap[productId] -= 1;
    return countMap[productId];
  };

  const getTotalCount = () => {
    let count = 0;
    Object.values(countMap).forEach((number) => {
      count += number;
    });
    return count;
  };

  return {
    increase,
    decrease,
    getTotalCount,
  };
}
