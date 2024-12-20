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
            type: Sequelize.STRING,
            allowNull: true,
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        link_youtube: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        layanan_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: 'sub_layanan',
        underscored: true,
        timestamps: true,
    },
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
