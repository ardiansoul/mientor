import { Response } from 'express';

export default function responseHandler(
  res: Response,
  data: Record<string, any> | Array<any> | null,
  message: string,
  meta: Record<string, any> | null = null,
  statusCode = 200,
) {
  res.status(statusCode).json({
    data,
    message,
    meta,
  });
}
