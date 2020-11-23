import Express from 'express';
import HealthcheckController from './controllers/HealthcheckController';
import AdminController from './controllers/AdminController';

const router = Express.Router();

router.use('/', HealthcheckController);
router.use('/', AdminController);

export default router;
