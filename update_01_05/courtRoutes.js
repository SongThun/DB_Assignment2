import express from 'express'
import TableController from '../controllers/TableController.js';
import RentalController from '../controllers/RentalController.js';
const router = express.Router();



router.get('/court_rental/', RentalController.display)
router.post('/court_rental/add', RentalController.findAvailableAdd);
router.post('/court_rental/edit', RentalController.findAvailableEdit);

router.get('/:table', TableController.display);
router.post('/:table', TableController.add);

router.put('/:table/:court_id', TableController.edit);
router.delete('/:table/:court_id', TableController.delete);
router.post('/:table/filter-sort', TableController.filtersort);

router.put('/:table/:court_id/:court_date/:start_time', TableController.edit);
router.delete('/:table/:court_id/:court_date/:start_time', TableController.delete);

export default router;