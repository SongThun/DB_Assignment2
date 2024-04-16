import express from 'express'
import TableController from '../controllers/TableController.js'

const router = express.Router();


router.get('/:table', TableController.display);
router.post('/:table', TableController.add);
router.put('/:table/:program_name/:start_date/:end_date', TableController.edit);
router.delete('/:table/:program_name/:start_date/:end_date', TableController.delete);
router.post('/:table/filter-sort', TableController.filtersort);

export default router;
