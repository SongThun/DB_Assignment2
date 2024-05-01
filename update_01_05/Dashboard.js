import { createConnection } from 'mysql2';
import {connect} from '../database.js'
import mysql from 'mysql2'

const Dashboard = {
  getAttributes: async (procedure) => {
    const db = connect();
    let sql = `CALL badminton_court_db.${procedure}();`;
    const result = await db.query(sql);
    return result[0][0];
  },
  
  display: async function(table, attrFilter, attrSort) {
    const db = connect();
    const attributes = await this.getAttributes(table);
    const result = await db.query(sql);
    return result[0]; 
  },
  getMembershipPercent: async () => {
    const db = connect();
    let sql = `CALL CalculateMembershipPercentage()`;
    try {
      const result = await db.query(sql);
      return {result: result[0][0][0].Membership_Percentage} // {Membership_Percentage: value, ...}
    }
    catch (err) {
      return {err: err}
    }
  },
  getCustomerNumber: async () => {
    const db = connect();
    try {
      let sql = `SELECT count(distinct cus_phone) AS number_of_cus FROM court_rental WHERE month(court_date) = month(current_date()) - 1`;
      const result = await db.query(sql);
      return {result: result[0][0].number_of_cus}; // value only 
    }
    catch(err) {
      return {err: err}
    }
  },
  getRevenue: async (service) => {
    const db = connect();
    try {
      const result = await db.query(`CALL Monthly${service}Revenue();`);
      return {result: result[0][0][0].total_revenue}; // value only
    }
    catch(err) {
      return {err: err}
    }
  }
}

export default Dashboard
