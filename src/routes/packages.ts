import { Router } from 'express';
import { createPackage } from '../controllers/package';

const router = Router();

router.post('/', createPackage);   // CREATE Route
export default router;