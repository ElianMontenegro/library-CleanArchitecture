import { Controller, HttpRequest } from '../../presentation/protocols'
import { Request, Response } from 'express'

export const AdaptRoute = (controller : Controller) => {
    return async (req: Request, res: Response) => {
        const httpRequest : HttpRequest = {
            ...(req.body || {})
        }
        const httpResponse = await controller.handle(httpRequest);
        res.status(httpResponse.statusCode).json(httpResponse.body)
    }
}