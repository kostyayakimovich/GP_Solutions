export const checkUserCreate = (
  arrUsers: any,
  login: string,
  email: string
) => {
  return arrUsers.find(
    (item: { login: string; email: string }) =>
      item.login === login || item.email === email
  );
};
export const checkUserSignin = (
  arrUsers: any,
  login: string,
  password: string
) => {
  return arrUsers.find(
    (item: { login: string; password: string }) =>
      item.login === login && item.password === password
  );
};
