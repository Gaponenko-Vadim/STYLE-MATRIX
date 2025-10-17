// types/express.d.ts
import { AuthRequest } from "../middleware/auth";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        email: string;
        role: string;
      };
    }
  }
}
