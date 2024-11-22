import { Model, where } from "sequelize"
import db from "../models"

const getGroupWithRole = async (user) => {
    let roles = await db.Group.findOne({
        where: { id: user.groupId },
        attributes: ['id', 'name', 'description'],
        include: [{
            model: db.Role,
            attributes: ['id', 'url', 'description'],
            through: { attributes: [] }
        }]
    });
    return roles ? roles : {};
}

module.exports = {
    getGroupWithRole
}