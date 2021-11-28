import { Router } from "express";
import { AdaptRoute } from "@/main/adapters/express-route-adapter";
import { makeSignupController } from "@/main/factories/controllers";

export default (router : Router): void => {
    router.post('/signup', AdaptRoute(makeSignupController()))
}