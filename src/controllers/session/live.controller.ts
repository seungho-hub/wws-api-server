import { Request, Response } from 'express';
import asyncCatch from '../../utils/asyncCatch';
import { liveSessionService } from '../../services';

export const getLiveSession = asyncCatch(
  async (req: Request, res: Response) => {
    const session = await liveSessionService.getLiveSession({
      session: res.locals.session,
      userId: req.session.userId as number,
    });

    return res.status(200).json(session);
  }
);

export const createLiveSession = asyncCatch(
  async (req: Request, res: Response) => {
    const session = await liveSessionService.createLiveSession({
      ...req.body,
      userId: req.session.userId,
      thumbnail: req.file,
    });

    return res.status(201).json(session);
  }
);

export const updateLiveSessionStatus = asyncCatch(
  async (req: Request, res: Response) => {
    const status = await liveSessionService.updateLiveSessionStatus({
      session: res.locals.session,
      status: req.body.status,
    });

    return res.status(200).json(status);
  }
);
