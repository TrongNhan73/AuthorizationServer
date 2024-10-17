import e from 'express';
import { createNewUser, getUserList, deleteUser, getUserById, updateUser } from '../services/user.service';
import { isColString } from 'sequelize/lib/utils';

const getHomePage = (req, res) => {
    return res.render('home.view.ejs');
}


const getUser = async (req, res) => {
    // const userList =  getUserList();
    const userList = await getUserList();


    return res.render('user.view.ejs', { userList });
}

const handleCreateUser = async (req, res) => {
    const { username, password, email } = req.body;
    await createNewUser(email, password, username);

    res.redirect("/users");
}

const handleDeleteUser = async (req, res) => {
    await deleteUser(req.params.id);
    res.redirect("/users");
}

const handleGetUpdatePage = async (req, res) => {
    let in4User = await getUserById(req.params.id);
    console.log(in4User.dataValues);
    res.render('updateUser.view.ejs', { in4User });
}

const handleUpdateUser = async (req, res) => {
    const { email, username } = req.body;
    await updateUser(req.params.id, username, email);
    res.redirect('/users');
}

module.exports = {
    getHomePage,
    getUser,
    handleCreateUser,
    handleDeleteUser,
    handleUpdateUser,
    handleGetUpdatePage
}