import sequelize from '../utils/db.js';
import { Sequelize } from 'sequelize';
import Layanan from './layanan.js';

const Testimoni = sequelize.define(
    'Testimoni',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        nama: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        isi: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: 'testimoni',
        underscored: true,
        timestamps: true,
    }
);

Testimoni.belongsTo(Layanan, {
    foreignKey: 'layanan_id',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
});

Layanan.hasMany(Testimoni, {
    foreignKey: 'layanan_id',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
});

export default Testimoni;
