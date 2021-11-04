import { Router } from "express";
import { AdaptRoute } from "../adapters/express-route-adapter";
import { makeAddBookController } from "../factories/controllers";


export default (router : Router): void => {
    router.post('/add-book', AdaptRoute(makeAddBookController()))
}