import session from 'express-session';
import {createDatabase} from '../database.js'
import mysql from 'mysql2'

const authController = {
    login: async (req, res) => {
        if (req.body.username == 'sManager') {
            const result = await createDatabase(req.body.username, req.body.password);
            console.log(result);
            if (result == 'success') 
                
                return res.json({valid: true, username: req.body.username})
            else {
                console.log(result);
                return res.json({valid: false, msg: 'Incorrect password, please try again'})
            }
        }
        else {
            return res.json({valid: false, msg: "Username does not exist"});
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('admin');
        return res.json('success');
    }
};

export default authController;