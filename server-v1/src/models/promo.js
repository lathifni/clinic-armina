import { Sequelize } from 'sequelize';
import sequelize from '../utils/db.js';
import Layanan from './layanan.js';

const Promo = sequelize.define(
    'Promo',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'promo',
        underscored: true,
        timestamps: true,
    }
);

Promo.belongsTo(Layanan, {
    foreignKey: 'layanan_id',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

Layanan.hasMany(Promo, {
    foreignKey: 'layanan_id',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
});

export default Promo;
