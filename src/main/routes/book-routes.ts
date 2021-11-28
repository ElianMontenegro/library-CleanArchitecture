import { Router } from "express";
import { AdaptRoute } from "src/main/adapters/express-route-adapter";
import { makeAddBookController } from "src/main/factories/controllers";


export default (router : Router): void => {
    router.post('/add-book', AdaptRoute(makeAddBookController()))
}