import { Router } from "express";
import { createTracking, getTracking, updateTracking, deleteTracking } from '../controllers/track';

const router = Router();

router.post('/:packageId', createTracking);
router.get('/', getTracking );
router.patch('/:packageId/:trackingId', updateTracking);
router.delete('/:packageId/:trackingId', deleteTracking);

export default router;
