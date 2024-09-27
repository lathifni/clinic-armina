import sequelize from '../utils/db.js';
import { Sequelize } from 'sequelize';
import Layanan from './layanan.js';

const Galeri = sequelize.define(
    'Galeri',
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
        tableName: 'galeri',
        underscored: true,
        timestamps: true,
    }
);

Galeri.belongsTo(Layanan, {
    foreignKey: 'layanan_id',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
});

Layanan.hasMany(Galeri, {
    foreignKey: 'layanan_id',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
});

export default Galeri;
