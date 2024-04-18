import express from 'express'
import TableController from '../controllers/TableController.js'

const router = express.Router();


router.get('/:table', TableController.display);
router.post('/:table', TableController.add);
router.put('/:table/:product_name', TableController.edit);
router.delete('/:table/:product_name', TableController.delete);
router.post('/:table/filter-sort', TableController.filtersort);

export default router;
