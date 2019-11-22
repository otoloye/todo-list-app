export const isNotPresent = (inputArray, element) => {
  const normalizeInputArray = inputArray.map(item => item.title.toLowerCase());
  if (normalizeInputArray.includes(element.toLowerCase())) {
    return false;
  } else {
    return true;
  }
};
