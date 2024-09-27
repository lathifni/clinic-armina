import sequelize from '../utils/db.js';
import { Sequelize } from 'sequelize';

const Sunat = sequelize.define(
    'Sunat',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        nama: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        deskripsi: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        link_youtube: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'sunat',
        underscored: true,
        timestamps: true,
    }
);

export default Sunat;
