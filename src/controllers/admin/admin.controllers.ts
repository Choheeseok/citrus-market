import { Router } from "express";
import ctrl from "./admin.service";

const router = Router();

router.get("/signup", ctrl.get_signup);

router.post("/signup", ctrl.post_signup);

router.get("/signin", ctrl.get_signin);

router.post("/signin", ctrl.post_signin);

router.get("/signout", ctrl.get_signout);

export default router;
