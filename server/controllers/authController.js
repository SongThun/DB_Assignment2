import session from 'express-session';
import db from '../database.js'

const authController = {
    login: (req, res) => {
        let sql = `SELECT * FROM sManager WHERE username='${req.body.username}'`;
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            if (result.length > 0) {
                if (result[0].password === req.body.password) {
                    return res.json({valid: true, username: req.body.username})
                }
                else {
                    return res.json({valid: false, msg: 'Incorrect password, please try again'});
                }
            }
            else {
                return res.json({valid:false, msg: "Username doesn't exist"});
            }
        })
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('admin');
        return res.json('success');
    }
};

export default authController;