import { HttpResponse, HttpRequest } from "./http-response";

export interface Controller<T = any> {
    handle: (httpRequest : T | HttpRequest) => Promise<HttpResponse>
}