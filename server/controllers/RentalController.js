import Rental from '../models/Rental.js'

const RentalController = {
  findAvailable: (req, res) => {
    const values = Object.values(req.body);
    Rental.find(values, (err, result) => {
      if (err) return res.json({err: err});
      
      const attr = ['court_id', 'court_type', 'court_price'];
      let distinctSet = {};
      attr.forEach((key)=> {
        distinctSet[key] = new Set();
        result[0].forEach(item => distinctSet[key].add(item[key]));
        distinctSet[key] = Array.from(distinctSet[key]);
      });

      return res.json({
        result: result[0],
        distinct: distinctSet,
        attributes: attr,
        primaryKeys: ['court_id']
      })
    })
  }
}

export default RentalController;