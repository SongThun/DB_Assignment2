import Rental from '../models/Rental.js'
import Model from '../models/Model.js'

const RentalController = {
  display: async (req, res) => {
    const result = await Rental.display();
    if (result.length > 0) {
        let distinctSet = {};
        for (const key in result[0]) {
          distinctSet[key] = new Set();
          result.forEach(item => distinctSet[key].add(item[key]));
          distinctSet[key] = Array.from(distinctSet[key]);
        }
        return res.json({
          result: result, 
          distinct: distinctSet,
          attributes: Object.keys(result[0]),
          primaryKeys: ['court_id', 'court_date', 'start_time']
        });
    } else 
    return res.json({
      result: [],
      distinct: {},
      attributes: [],
      primaryKeys: []
    });
  },
  findAvailableAdd: async (req, res) => {
    const params = [
      req.body.court_date,
      req.body.start_time,
      req.body.end_time
    ]
    const result = await Rental.find(params);
    let distinctSet = {};
    for (const key in result[0]) {
      distinctSet[key] = new Set();
      result.forEach(item => distinctSet[key].add(item[key]));
      distinctSet[key] = Array.from(distinctSet[key]);
    }
    return res.json({
      result: result ? result : "",
      distinct: distinctSet,
      attributes: ['court_id', 'court_type', 'court_price'],
      primaryKeys: ['court_id']
    })
  },
  findAvailableEdit: async (req, res) => {
    const result = await Rental.findWithEdit(req.body.prev, req.body.new);
    let distinctSet = {};
    for (const key in result[0]) {
      distinctSet[key] = new Set();
      result.forEach(item => distinctSet[key].add(item[key]));
      distinctSet[key] = Array.from(distinctSet[key]);
    }
    return res.json({
      result: result ? result : "",
      distinct: distinctSet,
      attributes: ['court_id', 'court_type', 'court_price'],
      primaryKeys: ['court_id']
    })
  }
    
  
}

export default RentalController;