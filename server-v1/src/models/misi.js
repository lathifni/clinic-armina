import sequelize from '../utils/db.js';
import { Sequelize } from 'sequelize';

const Misi = sequelize.define(
    'Misi',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        isi: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'misi',
        underscored: true,
        timestamps: false,
    }
);

export default Misi;
