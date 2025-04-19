export const bindReactivyStates = ({ name, defaultValue }) => {
  if (typeof defaultValue !== 'object') {
    throw Error('DefaultValue must be Objecgt');
  }

  let value = { ...defaultValue };

  const getter = () => {
    return value;
  };

  const setter = (newValue) => {
    value = newValue;

    const changedKeys = [];

    const newValueKeys = Object.keys(newValue);

    newValueKeys.forEach((key) => {
      if (newValue[key] !== value[key]) {
        changedKeys.push(key);
      }
    });

    newValueKeys.forEach((key) => {
      if (!value[key]) {
        changedKeys.push(key);
      }
    });
  };

  return [getter, setter];
};
