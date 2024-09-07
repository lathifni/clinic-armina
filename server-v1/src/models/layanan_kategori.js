import sequelize from '../utils/db.js';
import { Sequelize } from 'sequelize';

const LayananKategori = sequelize.define(
    'LayananKategori',
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
    },
    {
        tableName: 'layanan_kategori',
        underscored: true,
        timestamps: true,
    }
);

sequelize.sync();

export default LayananKategori;
