import sequelize from '../utils/db.js';
import { Sequelize } from 'sequelize';

const Klinik = sequelize.define(
    'Klinik',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        nama: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        visi: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        misi: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: 'klinik',
        underscored: true,
        timestamps: false,
    }
);

export default Klinik;
