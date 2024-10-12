import Klinik from '../models/klinik.js';
import sequelize from '../utils/db.js';
import { dataValid } from '../validation/dataValidation.js';

const updateStruktur = async (req, res, next) => {
    const t = await sequelize.transaction();
    const valid = {
        image: 'required',
    };

    try {
        const id = req.params.id;
        const struktur = await dataValid(valid, req.body);

        if (struktur.message.length > 0) {
            return res.status(400).json({
                errors: struktur.message,
                message: 'Gagal menambahkan mengedit',
                data: null,
            });
        }

        const existingStruktur = await Klinik.findByPk(id);

        if (!existingStruktur) {
            return res.status(404).json({
                errors: ['Struktur not found'],
                message: 'Update Struktur Gagal',
                data: null,
            });
        }

        const result = await Klinik.update(
            {
                ...struktur.data,
            },
            {
                where: {
                    id: id,
                },
                transaction: t,
            }
        );

        if (result[0] === 0) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Struktur not found'],
                message: 'Update Struktur Gagal',
                data: null,
            });
        }

        await t.commit();
        res.status(200).json({
            errors: [],
            message: 'Update struktur success',
            data: struktur.data,
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/klinikController.js:updateStruktur - ' +
                    error.message
            )
        );
    }
};

const updateVisi = async (req, res, next) => {
    const t = await sequelize.transaction();
    const valid = {
        visi: 'required',
    };

    try {
        const id = req.prams.id;
        const visi = await dataValid(valid, req.body);

        const existingVisi = await Klinik.findByPk(id);

        if (!existingVisi) {
            return res.status(404).json({
                errors: ['Data Not Found'],
                message: 'Gagal Mengupdate Visi',
                data: null,
            });
        }

        if (visi.message.length > 0) {
            return res.status(400).json({
                errors: visi.message,
                message: 'Gagal update visi',
                data: tentang.data,
            });
        }

        const result = await Klinik.update(
            {
                ...visi.data,
            },
            {
                where: {
                    id: id,
                },
                transaction: t,
            }
        );

        if (result[0] === 0) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Data not found'],
                message: 'Update Visi Gagal',
                data: null,
            });
        }

        await t.commit();
        res.status(200).json({
            errors: [],
            message: 'Update Visi success',
            data: visi.data,
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/klinikController.js:updateVisi - ' + error.message
            )
        );
    }
};

export { updateStruktur, updateVisi };
