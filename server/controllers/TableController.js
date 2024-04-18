import Model from '../models/Model.js';


const TableController = {
  display: async (req, res) => {
    const table= req.params.table;
    const result = await Model.display(table, null, {});
    if (result.length > 0) {
        let distinctSet = {};
        for (const key in result[0]) {
          distinctSet[key] = new Set();
          result.forEach(item => distinctSet[key].add(item[key]));
          distinctSet[key] = Array.from(distinctSet[key]);
        }
        const attributes = await Model.getAttributes(table);
        const primaryKeys = await Model.getPrimaryKeys(table);

        return res.json({
          result: result, 
          distinct: distinctSet,
          attributes: Object.keys(attributes),
          primaryKeys: primaryKeys
        });
    } else 
    return res.json({
      result: [],
      distinct: {},
      attributes: [],
      primaryKeys: []
    });
  },
  filtersort: async (req, res) => {
    const attrFilter = req.body.filters;
    const attrSort = req.body.sort;
    
    const result= await Model.display(req.params.table, attrFilter, attrSort);
    return res.json(result);
  },

  add: async (req, res) => {
    const {err, result} = await Model.create(req.params.table, req.body)
    if (err) return res.json({err: err});
    const result2 = await Model.display(req.params.table, null, {})
    return res.json(result2);
  },

  edit: async (req, res) => {
    const {table, ...keys} = req.params;
    const {err, result} = await Model.update(table, keys, req.body)
    if (err) return res.json({err: err});
    const result2 = await Model.display(table, null, {})
    return res.json(result2);
  },
  delete: async (req, res) => {
    const {table, ...keys} = req.params;
    const {err, result } = await Model.delete(table, keys);
    if (err) return res.json({err: err});
    const result2 = await Model.display(table, null, {});
    return res.json(result2);
  },
}
export default TableController;