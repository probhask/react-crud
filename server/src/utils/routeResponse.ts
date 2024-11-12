import { Response } from "express";

export const routeResponse = (
  res: Response,
  success: boolean,
  code: number,
  message: string
): Response => {
  return res.status(code).json({ success, message });
};

// catch error response
export const catchErrorResponse = (res: Response, error: unknown): Response => {
  return res.status(500).json({
    message:
      error instanceof Error
        ? error.message
        : "Server error .Please try again!",
  });
};
