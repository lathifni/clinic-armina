import sequelize from '../utils/db.js';
import { Sequelize } from 'sequelize';

const Faq = sequelize.define(
    'Faq',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        pertanyaan: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        jawaban: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: 'faq',
        underscored: true,
        timestamps: true,
    }
);

export default Faq;
