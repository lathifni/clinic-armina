import sequelize from '../utils/db.js';
import { Sequelize } from 'sequelize';
import LayananKategori from './layanan_kategori.js';

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
        price: {
            type: Sequelize.LONG,
            allowNull: true,
        },
        link: {
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

Layanan.belongsTo(LayananKategori, {
    foreignKey: 'layanan_kategori_id',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
});

LayananKategori.hasMany(Layanan, {
    foreignKey: 'layanan_kategori_id',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
});

export default LayananKategori;
