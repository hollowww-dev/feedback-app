import { createContext } from "react";
import { User } from "../types";

const UserContext = createContext<Omit<User, "passwordHash"> | null>(null);

export default UserContext;
