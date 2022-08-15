import { Router } from "express";
import { createTracking, getTracking, getSingleTracking, updateTracking, deleteTracking } from '../controllers/track';

const router = Router();

router.post('/:packageId', createTracking);
router.get('/', getTracking );
router.get('/:packageId/:trackingId', getSingleTracking );
router.patch('/:packageId/:trackingId', updateTracking);
router.delete('/:packageId/:trackingId', deleteTracking);

export default router;
