import { Session } from "next-auth";

export type AuthUserSession = {
  userId: string;
  session: Session;
};
