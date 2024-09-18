import sequelize from '../utils/db.js';
import { Sequelize } from 'sequelize';
import Layanan from './layanan.js';

const SubLayanan = sequelize.define(
    'SubLayanan',
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
        harga: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'sub_layanan',
        underscored: true,
        timestamps: true,
    }
);

SubLayanan.belongsTo(Layanan, {
    foreignKey: 'layanan_id',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
});

Layanan.hasMany(SubLayanan, {
    foreignKey: 'layanan_id',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
});

export default SubLayanan;
