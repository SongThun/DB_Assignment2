import db from '../database.js'

const Model = {
  getAttributes:function(table, callback) {
    let sql = `SELECT column_name, data_type
              FROM information_schema.columns
              WHERE table_schema = 'badminton_court_db'
              AND table_name = '${table}'
              ORDER BY ordinal_position;`;
    let attributes = {};
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        callback(err, null); // Pass error to the callback
      } else {
        result.forEach(row => {
          attributes[row.COLUMN_NAME] = row.DATA_TYPE;
        });
        callback(null, attributes); // Pass attributes to the callback
      }
    });
  },
  getPrimaryKeys: function(table, callback) {
    let sql = `SELECT column_name
              FROM information_schema.columns
              WHERE column_key = "PRI" 
              AND table_schema = 'badminton_court_db'
              AND table_name = '${table}'
              ORDER BY ordinal_position`;
    let primaryKeys = [];
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        callback(err, null); // Pass error to the callback
      } else {
        result.forEach(row => {
          primaryKeys.push(row.COLUMN_NAME);
        });
        callback(null, primaryKeys); // Pass attributes to the callback
      }
    });
  },
  display: function(table, attrFilter, attrSort, callback) {
    this.getAttributes(table, (err, attributes) => {
      let sql = `SELECT `
      for(const key in attributes) {
        if (attributes[key] == 'date') {
          sql += `DATE_FORMAT(${key}, '%Y-%m-%d') as ${key},`
        }
        else if (attributes[key] == 'time') {
          sql += `DATE_FORMAT(${key}, '%H:%i') as ${key},`
        }
        else {
          sql += `${key},`;
        }
      } 
      sql = sql.slice(0, -1) + ` FROM ${table} `;
      if (attrFilter) {
        sql += 'WHERE ';
        for (const key in attrFilter) {
          sql += key + " IN (";
          for (let i = 0; i < attrFilter[key].length; i++) {
            sql += `'${attrFilter[key][i]}'` + ","
          }
          sql = sql.slice(0,-1) + ') AND '; 
        }
        sql = sql.slice(0,-4);
      }
      if (Object.keys(attrSort).length > 0) {
        sql += ' ORDER BY ';
        for (const key in attrSort) {
          sql += key;
          sql += (attrSort[key] ? ' DESC,' : ' ASC,');
        }
        sql = sql.slice(0,-1);
      }
      db.query(sql, callback);
    })
  },
  
  create: function(table, values, callback) {
    let sql = `INSERT INTO ${table}(`;
    for (const key in values) {
      sql += `${key},`
    }
    sql = sql.slice(0,-1) + ') VALUES (';
    for (const key in values) {
      sql += `'${values[key]}',`;
    }
    sql = sql.slice(0,-1) + ');';
    db.query(sql, callback);
  },

  update: function(table, primaryKeys, newValues, callback) {
    let sql = `UPDATE ${table} SET `;
    for (const key in newValues) {
      sql += key + '=' + `'${newValues[key]}'` + ",";
    }
    sql = sql.slice(0,-1) + ' WHERE ';
    for (const pk in primaryKeys) {
      sql += `${pk} = ${primaryKeys[pk]} AND`;
    }
    sql = sql.slice(0, -4);
    db.query(sql, callback);
  },

  delete: function(table, primaryKeys, callback) {
    let sql = `DELETE FROM ${table} WHERE `;
    for (const pk in primaryKeys) {
      sql += `${pk} = '${primaryKeys[pk]}' AND `;
    }
    sql = sql.slice(0, -4);
    db.query(sql, callback);
  }
};

export default Model;