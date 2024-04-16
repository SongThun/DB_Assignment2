import db from '../database.js'

const Rental = {
  find: (values, callback) => {
    let sql = `CALL court_availability(?,?,?); `
    db.query(sql, values, callback);
  }
}
export default Rental;