import {connect} from '../database.js'
import Model from './Model.js';
import mysql from 'mysql2'

const Rental = {
  display: async () => {
    const db = connect();
    let sql = `select 
                cr.*, 
                total_rental_price(court_id, court_date, start_time, end_time, cus_phone) as price
              from court_rental cr;`
    try {
      const result = await db.query(sql);
      return result[0];
    } catch(err) {
      return {err: err};
    }
  },
  find: async (values) => {
    const db = connect();
    let sql = 'CALL court_availability(?,?,?)';
    const result = await db.query(sql, values);
    return result[0][0];
  },
  findWithEdit: async (prevValues, newValues) => {
    const db = connect();
    const connection = await db.getConnection();
    try {
      const deleteSQL = `DELETE from court_rental
                        WHERE court_id=? AND
                        court_date=? AND
                        start_time=?`;
      const procedureSQL = `CALL court_availability(?,?,?)`;
      const addSQL = `INSERT INTO court_rental
                      VALUES (?, ?, ?, ?, ?, ?, ?)`;
      
      // Start a transaction
      
      await connection.beginTransaction();
  
      // Delete the old record
      await connection.query(deleteSQL, [prevValues.court_id, prevValues.court_date, prevValues.start_time]);
  
      // Call the stored procedure
      const result = await connection.query(procedureSQL, [newValues.court_date, newValues.start_time, newValues.end_time]);
  
      // Insert the new record
      await connection.query(addSQL, [
        newValues.court_id,
        newValues.court_date,
        newValues.start_time,
        newValues.end_time,
        newValues.cus_phone,
        newValues.booking_method,
        newValues.receptionist_id
      ]);
  
      // Commit the transaction
      await connection.commit();
      
      return result[0][0];
    } catch (err) {
      console.error('Error performing transactions:', err);
      await connection.rollback();
      callback(err, result)
    } finally {
      connection.release();
    }
  }
  
}
export default Rental;