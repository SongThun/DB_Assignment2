import Dashboard from '../models/Dashboard.js'

const DashboardController ={
  display: async (req,res) => {
    const procedure=req.params.procedure;
    const result = await Dashboard.getAttributes(procedure);
  return res.json(result);
  },
  getCardData: async(req, res) => {
    let result;
    if (req.params.data == 'membership-percentage')
      result = await Dashboard.getMembershipPercent();
    else if (req.params.data == 'customer-number')
      result = await Dashboard.getCustomerNumber();
    else if (req.params.data == 'court-revenue')
      result = await Dashboard.getRevenue('Court');
    else if (req.params.data == 'product-revenue')
      result = await Dashboard.getRevenue('Product');
    else 
      return res.json({err: 'Invalid card data'});
    
    return res.json(result);
  }
}

export default DashboardController;