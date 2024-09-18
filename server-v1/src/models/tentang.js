import sequelize from '../utils/db.js';
import { Sequelize } from 'sequelize';

const Tentang = sequelize.define(
    'Tentang',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'tentang',
        underscored: true,
        timestamps: true,
    }
);

export default Tentang;
