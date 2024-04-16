import express from 'express'
import TableController from '../controllers/TableController.js';
import RentalController from '../controllers/RentalController.js';
const router = express.Router();


// router.get('/', courtRentalCtrl.displayRental);
// router.get('/available/:court_date/:start_time/:end_time', courtRentalCtrl.available);
// router.post('/book/:court_id/', courtRentalCtrl.book);

// router.post('/available/edit', courtRentalCtrl.editAvailable);

// router.delete('/:court_id/:court_date:/start_time', 
//               courtRentalCtrl.deleteRental);
// router.post('/filter-sort', courtController.filtersort);

router.get('/:table', TableController.display);
router.post('/:table', TableController.add);

router.put('/:table/:court_id', TableController.edit);
router.delete('/:table/:court_id', TableController.delete);
router.post('/:table/filter-sort', TableController.filtersort);

router.put('/:table/:court_id/:court_date/:start_time', TableController.edit);
router.delete('/:table/:court_id/:court_date/:start_time', TableController.delete);

router.post('/court_rental/available', RentalController.findAvailable);
export default router;