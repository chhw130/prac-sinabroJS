export const setupCounter = () => {
  const [getCountMap, setCountMap] = bindReactivyStates({ name: 'countMap', defaultValue: {} });

  const increase = ({ productId }) => {
    const copyCountMap = { ...getCountMap() };

    if (copyCountMap[productId] === undefined) {
      copyCountMap[productId] = 0;
    }
    copyCountMap[productId] = (copyCountMap[productId] || 0) + 1;

    setCountMap(copyCountMap);
    return countMap[productId];
  };

  const decrease = ({ productId }) => {
    const copyCountMap = { ...getCountMap() };

    if (copyCountMap[productId] === undefined) {
      copyCountMap[productId] = 0;
    }
    copyCountMap[productId] = (copyCountMap[productId] || 0) - 1;

    setCountMap(copyCountMap);
    return countMap[productId];
  };

  const getTotalCount = () => {
    return Object.values(getCountMap()).reduce((acc, cur) => (acc += cur), 0);
  };

  return {
    increase,
    decrease,
    getTotalCount,
  };
};
