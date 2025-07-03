import { User } from "./User.ts";

declare global {
  namespace Express {
    interface Request {
      user: User | { email: "Anonymous" };
      // Add any other fields you might attach to the request object
    }
  }
}
