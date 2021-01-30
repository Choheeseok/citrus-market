import { Router } from "express";
import ctrl from "./mypage.service";

const router = Router();

router.get("/", ctrl.get_mypage);

export default router;
