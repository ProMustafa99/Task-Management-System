import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/httpException';
import nodemailer from 'nodemailer';
import { logger } from '@utils/logger';

export const ErrorMiddleware = async (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'm.salameh@hagzi.com',
        pass: 'jjiuryjrgxbqfibs',
      },
    });

    const mailOptions = {
      from: 'm.salameh@hagzi.com',
      to: 'mustafaksalameh99@gmail.com,yazan@hagzi.com',
      subject: `Error in API: ${message}`,
      text: `Error occurred at ${req.path}\nMethod: ${req.method}\nStatus: ${status}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(status).json({ message });

  } catch (emailError) {
    next(emailError);
  }
};
