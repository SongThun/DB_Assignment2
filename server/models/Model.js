import {connect} from '../database.js'


const Model = {
  getAttributes: async function(table) {
    const db = connect();
    let sql = `SELECT column_name, data_type
              FROM information_schema.columns
              WHERE table_schema = 'badminton_court_db'
              AND table_name = '${table}'
              ORDER BY ordinal_position;`;
    let attributes = {};
    const result = await db.query(sql);
    result[0].forEach(row => {
      attributes[row.COLUMN_NAME] = row.DATA_TYPE;
    });
    return attributes;
  },
  getPrimaryKeys: async function(table) {
    const db = connect();
    let sql = `SELECT column_name
              FROM information_schema.columns
              WHERE column_key = "PRI" 
              AND table_schema = 'badminton_court_db'
              AND table_name = '${table}'
              ORDER BY ordinal_position`;
    let primaryKeys = [];
    const result = await db.query(sql);
    result[0].forEach(row => {
      primaryKeys.push(row.COLUMN_NAME);
    });
    return primaryKeys;
  },
  display: async function(table, attrFilter, attrSort) {
    const db = connect();
    const attributes = await this.getAttributes(table);
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
    const result = await db.query(sql);
    return result[0];
  },
  
  create: async function(table, values) {
    const db = connect();
    let sql = `INSERT INTO ${table}(`;
    for (const key in values) {
      sql += `${key},`
    }
    sql = sql.slice(0,-1) + ') VALUES (';
    for (const key in values) {
      sql += `'${values[key]}',`;
    }
    sql = sql.slice(0,-1) + ');';
    try {
      const result = await db.query(sql);
      return {result : result[0]};
    } catch(err) {
      return {err: err}
    }
  },

  update: async function(table, primaryKeys, newValues) {
    const db = connect();
    let sql = `UPDATE ${table} SET `;
    for (const key in newValues) {
      sql += key + '=' + `'${newValues[key]}'` + ",";
    }
    sql = sql.slice(0,-1) + ' WHERE ';
    for (const pk in primaryKeys) {
      sql += `${pk} = '${primaryKeys[pk]}' AND `;
    }
    sql = sql.slice(0, -4);
    try {
      const result = await db.query(sql);
      return {result : result[0]};
    } catch(err) {
      return {err: err}
    }
  },

  delete: async function(table, primaryKeys) {
    const db = connect();
    let sql = `DELETE FROM ${table} WHERE `;
    for (const pk in primaryKeys) {
      sql += `${pk} = '${primaryKeys[pk]}' AND `;
    }
    sql = sql.slice(0, -4);
    try {
      const result = await db.query(sql);
      return {result : result[0]};
    } catch(err) {
      return {err: err}
    }
  }
};

export default Model;