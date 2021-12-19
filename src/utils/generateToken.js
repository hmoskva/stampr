const generateToken = () => {
  return `${new Date().getTime()}${Math.ceil(Math.random() * 99999)}`;
};

export default generateToken;
