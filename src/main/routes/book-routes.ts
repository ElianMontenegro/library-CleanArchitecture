import { Router } from "express";
import { AdaptRoute } from "../../main/adapters/express-route-adapter";
import { makeAddBookController } from "../../main/factories/controllers";


export default (router : Router): void => {
    router.post('/add-book', AdaptRoute(makeAddBookController()))
}