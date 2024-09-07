import sequelize from '../utils/db.js';
import { Sequelize } from 'sequelize';

const Layanan = sequelize.define(
    'Layanan',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
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
        tableName: 'layanan',
        underscored: true,
        timestamps: true,
    }
);

export default LayananKategori;
