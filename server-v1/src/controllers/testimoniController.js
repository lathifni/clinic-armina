import { where } from 'sequelize';
import Layanan from '../models/layanan.js';
import Testimoni from '../models/testimoni.js';
import sequelize from '../utils/db.js';
import { dataValid } from '../validation/dataValidation.js';

const creteTestimoni = async (req, res, next) => {
    const t = await sequelize.transaction();
    const valid = {
        nama: 'required',
        isi: 'required',
        layanan_id: 'required',
    };
    try {
        const testimoni = await dataValid(valid, req.body);

        if (testimoni.message.length > 0) {
            return res.status(400).json({
                errors: testimoni.message,
                message: 'Gagal menambahkan testimoni',
                data: null,
            });
        }

        const layananExists = await Layanan.findByPk(testimoni.data.layanan_id);
        if (!layananExists) {
            return res.status(400).json({
                errors: [
                    `Layanan dengan ID ${testimoni.data.layanan_id} tidak ditemukan`,
                ],
                message: 'Gagal menambah promo',
                data: null,
            });
        }

        const result = await Testimoni.create(
            {
                ...testimoni.data,
            },
            {
                transaction: t,
            }
        );

        if (!result) {
            await t.rollback();
            return res.status(404).json({
                errors: ['testimoni gagal ditambahkan'],
                message: 'Gagal menambahkan testimoni',
                data: null,
            });
        } else {
            await t.commit();
            res.status(201).json({
                errors: null,
                message: 'Testimoni baru berhasil ditambahkan',
                data: result,
            });
        }
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/testimoniController.js:createTestimoni - ' +
                    error.message
            )
        );
    }
};

const updateTestimoni = async (req, res, next) => {
    const t = await sequelize.transaction();
    const valid = {
        nama: 'required',
        isi: 'required',
        layanan_id: 'required',
    };

    try {
        const id = req.params.id;
        const testimoni = await dataValid(valid, req.body);

        if (testimoni.message.length > 0) {
            return res.status(400).json({
                errors: testimoni.message,
                message: 'Update testimoni gagal',
                data: null,
            });
        }

        const existingTestimoni = await Testimoni.findByPk(id);

        if (!existingTestimoni) {
            return res.status(404).json({
                errors: ['Testimoni not found'],
                message: 'Update Testimoni Gagal',
                data: null,
            });
        }

        const result = await Testimoni.update(
            {
                ...testimoni.data,
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
                errors: ['Testimoni not found'],
                message: 'Update Testimoni Gagal',
                data: null,
            });
        }

        await t.commit();
        res.status(200).json({
            errors: [],
            message: 'Update testimoni success',
            data: testimoni.data,
        });
    } catch (error) {
        next(
            new Error(
                'controllers/testimoniController.js:updateTestimoni - ' +
                    error.message
            )
        );
    }
};

const deleteTestimoni = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const id = req.params.id;
        const testimoni = await Testimoni.findByPk(id);

        if (!testimoni) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Testimoni not found'],
                message: 'Delete Testimoni gagal',
                data: null,
            });
        }

        const deleteTestimoni = await Testimoni.destroy({
            where: {
                id: id,
            },
            transaction: t,
        });

        if (!deleteTestimoni) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Testimoni not found'],
                message: 'Delete Testimoni gagal',
                data: null,
            });
        }

        await t.commit();
        return res.status(200).json({
            errors: [],
            message: 'Delete testimoni success',
            data: null,
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/testimoniController.js:deleteTestimoni - ' +
                    error.message
            )
        );
    }
};

const getAllTestimoni = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search_query || '';
        const offset = limit * page;

        const whereCondition = {
            [Op.or]: [
                {
                    '$Layanan.name$': {
                        [Op.like]: `%${search}%`,
                    },
                },
                {
                    name: {
                        [Op.like]: `%${search}%`,
                    },
                },
            ],
        };

        const totalRows = await Testimoni.count({
            where: whereCondition,
            include: [
                {
                    model: Layanan,
                    required: true,
                },
            ],
        });

        const totalPage = Math.ceil(totalRows / limit);

        const result = await Testimoni.findAll({
            where: whereCondition,
            include: [{ model: Layanan, required: true }],
            offset: offset,
            limit: limit,
            order: [['updated_at', 'DESC']],
        });

        if (!result || result.length === 0) {
            return res.status(404).json({
                errors: ['Testimoni tidak ditemukan'],
                message: 'Get Testimoni gagal',
                data: null,
            });
        }

        res.status(200).json({
            errors: [],
            message: 'Get Testimoni success',
            data: result,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage,
        });
    } catch (error) {
        next(
            new Error(
                'controllers/galerController.js:getAllTestimoni - ' +
                    error.message
            )
        );
    }
};

export { creteTestimoni, updateTestimoni, deleteTestimoni, getAllTestimoni };
