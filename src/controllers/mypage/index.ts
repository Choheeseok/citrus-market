import { Router } from "express";
import ctrl from "./mypage.ctrl";

const router = Router();

router.get("/", ctrl.get_mypage);

export default router;
