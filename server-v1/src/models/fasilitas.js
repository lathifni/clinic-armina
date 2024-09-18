import sequelize from '../utils/db.js';
import { Sequelize } from 'sequelize';

const Fasilitas = sequelize.define(
    'Fasilitas',
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
            type: Sequelize.STRING,
            allowNull: true,
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'fasilitas',
        underscored: true,
        timestamps: true,
    }
);

export default Fasilitas;
