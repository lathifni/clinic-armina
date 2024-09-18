import sequelize from '../utils/db.js';
import { Sequelize } from 'sequelize';
import { encrypt } from '../utils/bcrypt.js';

const Users = sequelize.define(
    'Users',
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        username: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue('password', encrypt(value));
            },
        },
    },
    {
        tableName: 'users',
        underscored: true,
        timestamps: true,
    }
);

export default Users;
