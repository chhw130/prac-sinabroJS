export const bindReactivityState = ({ name, defaultValue }) => {
  if (typeof defaultValue !== 'object') {
    throw Error("Dont ' throw argument if you pass bind typeof object");
  }
  const value = { ...defaultValue };

  const setValue = () => {};

  return [value, setValue];
};
