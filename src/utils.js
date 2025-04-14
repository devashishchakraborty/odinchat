const clipText = (text) => {
  if (text.length <= 30) return text;
  return text.slice(0, 30) + "...";
};

export { clipText };
