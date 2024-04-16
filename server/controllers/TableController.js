import Model from '../models/Model.js';


const TableController = {
  display: (req, res) => {
    const table= req.params.table;
    Model.display(table, null, {}, (err, result) => {
      if (err) return res.json({err: err});
        
      if (result.length > 0) {
          let distinctSet = {};
          for (const key in result[0]) {
            distinctSet[key] = new Set();
            result.forEach(item => distinctSet[key].add(item[key]));
            distinctSet[key] = Array.from(distinctSet[key]);
          }
          Model.getAttributes(table, (err, attributes) => {
            if (err) return res.json({err: err});

            Model.getPrimaryKeys(table, (err, primaryKeys) => {
              if (err) return res.json({err: err});

              return res.json({
                result: result, 
                distinct: distinctSet,
                attributes: Object.keys(attributes),
                primaryKeys: primaryKeys
              });
            })
          })
          
      } else 
      return res.json({
        result: [],
        distinct: {},
        attributes: [],
        primaryKeys: []
      });
    })
  },
  filtersort: (req, res) => {
    const attrFilter = req.body.filters;
    const attrSort = req.body.sort;
    
    Model.display(req.params.table, attrFilter, attrSort, (err, result) => {
        if (err) return res.json({err: err});
        return res.json(result);
    })
  },
  add: (req, res) => {
    Model.create(req.params.table, req.body, (err, _) => {
      if (err) return res.json({err: err});
      Model.display(req.params.table, null, {}, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
      })
    })    

  },
  edit: (req, res) => {
    const {table, ...keys} = req.params;
    Model.update(keys, req.body, (err, _) => {
      if (err) return res.json({err: err});
      Model.display(table, null, {}, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
      })
    })
  },
  delete: (req, res) => {
    const {table, ...keys} = req.params;
    Model.delete(table, keys, (err, _) => {
      if (err) return res.json({err: err});
      Model.display(table, null, {}, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
      })
    })
  },
}
export default TableController;