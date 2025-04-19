const bindReactivyStates = ({ name, defaultValue }) => {
  if (typeof defaultValue !== 'object') {
    throw Error('DefaultValue must be Objecgt');
  }

  let value = { ...defaultValue };

  const getter = () => {
    return value;
  };

  const setter = (newValue) => {
    value = newValue;
  };

  return [getter, setter];
};
