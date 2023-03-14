import { createToken } from "../utility/authorization";
import { AUTH_ERRORS } from "./auth.responses";
import { ICredentials } from "./auth.types";

const login = (credentials: ICredentials) => {
  const users = [
    {
      username: "john",
      id: "0",
      password: "password@123",
    },
  ];
  const user = users.find(
    (u) =>
      u.username === credentials.username && u.password === credentials.password
  );

  if (!user) {
    throw AUTH_ERRORS.NOT_FOUND;
  }

  const token = createToken({ id: user.id });

  return {
    token,
    id: user.id,
  };
};

export default { login };
