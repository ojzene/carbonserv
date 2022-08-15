import express, { Router } from "express";
import { createPackage, getAllPackages } from '../controllers/package';

const router = Router();

router.post('/', createPackage);
router.get('/', getAllPackages);
export default router;