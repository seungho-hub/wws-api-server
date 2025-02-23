import { RequestHandler, Request, Response, NextFunction } from 'express';
import httpStatusCode from 'http-status-codes';
import { wwsError } from './wwsError';

const asyncCatch =
  (controller: RequestHandler) =>
  (req: Request, res: Response, next: NextFunction) => {
    //controller에서 error가 발생하지 않으면 무조건 resolve, express의 built-in async error handling이 동작하지 않음을 보장한다.
    //controller에서 error가 발생하면 custom error handler에게 err를 전달한다.
    Promise.resolve(controller(req, res, next)).catch((err) => {
      //expected된 error를 그대로 error handler에 보낸다.
      if (err instanceof wwsError) {
        return next(err);
      }
      //unexpected error에 대해선 internal error를 생성해 error handler에 보낸다.
      else {
        return next(
          new wwsError(
            httpStatusCode.INTERNAL_SERVER_ERROR,
            httpStatusCode.getStatusText(httpStatusCode.INTERNAL_SERVER_ERROR),
            err
          )
        );
      }
    });
  };

export default asyncCatch;
