import sequelize from '../utils/db.js';
import { Sequelize } from 'sequelize';

const TenagaMedis = sequelize.define(
    'TenagaMedis',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        nama: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        jenis: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        waktu_mulai: {
            type: Sequelize.TIME,
            allowNull: true,
        },
        waktu_selesai: {
            type: Sequelize.DATE,
            allowNull: true,
        },
    },
    {
        tableName: 'tenaga_medis',
        underscored: true,
        timestamps: true,
    }
);

export default TenagaMedis;
