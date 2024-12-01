import { NewUser, User } from "../types";
import { isString } from ".";
import bcrypt from "bcryptjs";
import { isBoolean } from "lodash";

export const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

export const parseUsername = (username: unknown): string => {
  if (!username || !isString(username)) {
    throw new Error("Incorrect or missing username");
  }

  return username;
};

const parsePassword = (password: unknown): string => {
  if (!password || !isString(password)) {
    throw new Error("Incorrect or missing password");
  } else if (password.length < 3) {
    throw new Error("Password needs to be at least 3 characters long");
  }

  return password;
};

// const parseSuperUser = (superUser: unknown): boolean => {
// 	if (superUser === undefined || !isBoolean(superUser)) {
// 		throw new Error("Incorrect or missing user permissions");
// 	}

// 	return superUser;
// };

const checkDevPassword = (devPassword: unknown): boolean => {
  const { DEVPASS } = process.env;
  if (devPassword === DEVPASS) {
    return true;
  } else {
    throw new Error("Incorrect developer password");
  }
};

export const toNewUser = async (user: unknown): Promise<NewUser> => {
  if (!user || typeof user !== "object") {
    throw new Error("Incorrect or missing user");
  }

  if (!("name" in user) || !("username" in user) || !("password" in user)) {
    throw new Error("Some fields are missing");
  }

  const passwordHash = await bcrypt.hash(parsePassword(user.password), 10);

  const superUser =
    "devPassword" in user && user.devPassword
      ? checkDevPassword(user.devPassword)
      : false;

  const parsedUser: NewUser = {
    name: parseName(user.name),
    username: parseUsername(user.username),
    upvoted: [],
    passwordHash,
    superUser,
  };

  return parsedUser;
};
