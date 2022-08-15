import express, { Router } from "express";
import { createPackage } from '../controllers/package';

const router = Router();

router.post('/', createPackage);
export default router;