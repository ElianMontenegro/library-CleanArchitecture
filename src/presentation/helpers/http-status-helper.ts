import { HttpResponse } from "../protocols";



export const noContent = (): HttpResponse => ({
    statusCode: 204,
    body: null
})

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error
})

export const forbidden = (error: Error): HttpResponse => ({
    statusCode: 403,
    body: error
  })

export const serverError = (error: Error): HttpResponse => ({
    statusCode: 500,
    body: error
})