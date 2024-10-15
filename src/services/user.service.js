import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import db from '../models';
import { where } from 'sequelize';




const salt = bcrypt.genSaltSync(10);


const hashUserPassword = (userpassword) => {
    return bcrypt.hashSync(userpassword, salt);
}


const createNewUser = async (email, password, username) => {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     port: '3307',
    //     user: 'root',
    //     database: 'authorizationserver'
    // });



    const hashpassword = hashUserPassword(password);

    try {
        await db.User.create({
            username,
            email,
            password: hashpassword
        });
    } catch (err) {
        console.log(err);
    }






    // connection.query('insert into users(username,email,password) values (?,?,?)', [username, email, hashpassword],
    //     function (err, results, fields) {
    //         console.log(results);
    //     }
    // )
}

const getUserList = async () => {
    // connection.query('select * from users',
    //     function (err, results, fields) {
    //         let users = [];
    //         if (err) {
    //             console.log(err);
    //             return users;
    //         }
    //         return results;
    //     }
    // )



    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     port: '3307',
    //     user: 'root',
    //     database: 'authorizationserver'
    // });
    // const [results] = await connection.execute('select * from users');


    let users = [];
    users = await db.User.findAll();
    return users;
}

const deleteUser = async (id) => {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     port: '3307',
    //     user: 'root',
    //     database: 'authorizationserver'
    // });
    // const [results] = await connection.execute('delete from users where id=?', [userid]);


    await db.User.destroy({
        where: {
            id
        }
    })
}

const updateUser = async (userid, username, email) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: '3307',
        user: 'root',
        database: 'authorizationserver'
    });
    const [results] = await connection.execute('update users set email=?,username=? where id=? ', [email, username, userid])
}

const getUserById = async (userId) => {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     port: '3307',
    //     user: 'root',
    //     database: 'authorizationserver'
    // });
    // const [user] = await connection.execute('select * from users where id=?', [userId])
    // return user[0];

    let user = await db.User.findOne({
        where: { id: userId }
    })
    return user;
}

module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUser
}