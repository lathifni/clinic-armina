import Misi from '../models/misi.js';
import sequelize from '../utils/db.js';
import { dataValid } from '../validation/dataValidation.js';

const addMisi = async (req, res, next) => {
    const t = await sequelize.transaction();
    const valid = {
        isi: 'required',
    };

    try {
        const misi = await dataValid(valid, req.body);

        if (misi.message.length > 0) {
            return res.status(400).json({
                errors: misi.message,
                message: 'Gagal menambahkan misi',
                data: null,
            });
        }

        const result = await Misi.create(
            {
                ...misi.data,
            },
            {
                transaction: t,
            },
        );

        if (!result) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Misi gagal ditambahkan'],
                message: 'Misi gagal ditambahkan',
                data: null,
            });
        } else {
            await t.commit();
            res.status(201).json({
                errors: null,
                message: 'Misi berhasil ditambahkan',
                data: result,
            });
        }
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/misiController.js:addMisi - ' + error.message,
            ),
        );
    }
};

const updateMisi = async (req, res, next) => {
    const t = await sequelize.transaction();
    const valid = {
        isi: 'requrired',
    };

    try {
        const id = req.params.id;
        const misi = await dataValid(valid, req.body);

        const existingMisi = await Misi.findByPk(id);

        if (!existingMisi) {
            return res.status(404).json({
                errors: ['Data Not Found'],
                message: 'Gagal Mengupdate Misi',
                data: null,
            });
        }

        if (misi.message.length > 0) {
            return res.status(400).json({
                errors: misi.message,
                message: 'Gagal update misi',
                data: misi.data,
            });
        }

        const result = await Misi.update(
            {
                ...misi.data,
            },
            {
                where: {
                    id: id,
                },
                transaction: t,
            },
        );

        if (result[0] === 0) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Misi not found'],
                message: 'Update Misi Gagal',
                data: null,
            });
        }

        await t.commit();
        res.status(200).json({
            errors: [],
            message: 'Update misi success',
            data: misi.data,
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/misiController.js:addMisi - ' + error.message,
            ),
        );
    }
};

const getMisi = async (req, res, next) => {
    try {
        const result = await Misi.findAll();

        if (!result || result.length === 0) {
            return res.status(404).json({
                errors: ['Misi tidak ditemukan'],
                message: 'Get Misi gagal',
                data: null,
            });
        }

        res.status(200).json({
            errors: [],
            message: 'Get Miis success',
            data: result,
        });
    } catch (error) {
        next(
            new Error(
                'controllers/misiController.js:getMisi - ' + error.message,
            ),
        );
    }
};

export { addMisi, updateMisi, getMisi };
