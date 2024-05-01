import express from 'express'
import TableController from '../controllers/TableController.js';
import DashboardController from '../controllers/DashboardController.js';

const router = express.Router();

router.get('/:procedure', DashboardController.display);
router.get('/card/:data', DashboardController.getCardData);
export default router;
