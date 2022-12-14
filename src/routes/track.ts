import express, { Router } from "express";
import { createTracking, getTracking, getTrackingByPackageId, getSingleTracking, updateTracking, deleteTracking } from '../controllers/track';

const router = Router();

router.post('/:packageId', createTracking);
router.get('/', getTracking);
router.get('/:packageId', getTrackingByPackageId);
router.get('/:packageId/:trackingId', getSingleTracking);
router.patch('/:packageId/:trackingId', updateTracking);
router.delete('/:packageId/:trackingId', deleteTracking);

export default router;
