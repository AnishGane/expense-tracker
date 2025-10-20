export const validateEmail = (email) => {
  const regex =
    /^[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,63})@[A-Za-z](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])(?:\.[A-Za-z]{2,})+$/;
  return regex.test(email);
};
