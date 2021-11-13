import { UnauthorizedError } from "../errors/unauthorized-error";
import { HttpResponse } from "../protocols";

export const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data
})

export const noContent = (): HttpResponse => ({
    statusCode: 204,
    body: null
})

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error
})

export const Unauthorized = (error: Error): HttpResponse => ({
    statusCode: 401,
    body: new UnauthorizedError()
})

export const forbidden = (error: Error): HttpResponse => ({
    statusCode: 403,
    body: error
  })

export const serverError = (error: Error): HttpResponse => ({
    statusCode: 500,
    body: error
})