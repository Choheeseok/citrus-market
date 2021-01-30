import { Router } from "express";
import ctrl from "./home.service";

const router = Router();

router.get("/", ctrl.get_home);

export default router;
