import { Router } from "express";
import { AdaptRoute } from "../adapters/express-route-adapter";
import { makeSignupController } from "../../main/factories/controllers";

export default (router : Router): void => {
    router.post('/signup', AdaptRoute(makeSignupController()))
}