import { NextFunction, Request, Response } from 'express';
export function validateToken(req: Request): string | null {
  let access_token: string | null = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    access_token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.access_token) {
    access_token = req.cookies.access_token;
  }
  return access_token;
}
