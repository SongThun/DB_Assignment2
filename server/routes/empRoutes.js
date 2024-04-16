import express from 'express'
import TableController from '../controllers/TableController.js'

const router = express.Router();


router.get('/:table', TableController.display);
router.post('/:table', TableController.add);
router.put('/:table/:court_id', TableController.edit);
router.delete('/:table/:court_id', TableController.delete);
router.post('/:table/filter-sort', TableController.filtersort);

export default router;
