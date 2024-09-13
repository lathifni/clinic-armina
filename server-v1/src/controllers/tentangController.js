import sequelize from '../utils/db.js';
import Tentang from '../models/tentang.js';
import { dataValid } from '../validation/dataValidation.js';
import fs from 'fs';
import { Op } from 'sequelize';
import { title } from 'process';

const createTentang = async (req, res, next) => {
    const t = await sequelize.transaction();

    const valid = {
        title: 'required',
        description: 'required',
    };

    try {
        const tentang = await dataValid(valid, req.body);
        if (tentang.message.length > 0) {
            return res.status(400).json({
                errors: tentang.message,
                message: 'Gagal menambahkan informasi tentang kami',
                data: null,
            });
        }

        const tentangExist = await Tentang.findAll({
            where: {
                title: tentang.data.title,
            },
        });

        if (tentangExist.length > 0) {
            return res.status(400).json({
                errors: ['Title telah tersedia'],
                message: 'Gagal menambahkan informasi tentang kami',
                data: null,
            });
        }

        if (req.file) {
            tentang.data.image = req.file.path;
        }

        const result = await Tentang.create(
            {
                ...tentang.data,
            },
            {
                transaction: t,
            }
        );

        if (!result) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Informasi tentang kami gagal ditambahkan'],
                message: 'Informasi tentang kami gagal ditambahkan',
                data: null,
            });
        } else {
            await t.commit();
            res.status(201).json({
                errors: null,
                message: 'Informasi tentang kami berhasil ditambahkan',
                data: result,
            });
        }
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/tentangController.js:createTentang - ' +
                    error.message
            )
        );
    }
};

const updateTentang = async (req, res, next) => {
    const t = await sequelize.transaction();

    const valid = {
        name: 'required',
        description: 'required',
    };
    try {
        const id = req.params.id;
        const tentang = await dataValid(valid, req.body);
        if (tentang.message.length > 0) {
            return res.status(400).json({
                errors: tentang.message,
                message: 'Gagal update informasi tentang kami',
                data: tentang.data,
            });
        }

        const existingTentang = await Tentang.findByPk(id);

        if (!existingTentang) {
            return res.status(404).json({
                errors: ['Tentang Kami Not Found'],
                message: 'Gagal Mengupdate Tentang Kami',
                data: null,
            });
        }

        if (req.file) {
            tentang.data.image = req.file.path;

            if (
                existingTentang.image &&
                existingTentang.image !== Tentang.data.image
            ) {
                fs.unlink(existingTentang.image, (err) => {
                    if (err) {
                        console.error(
                            `Gagal menghapus gambar lama (tentang): ${err.message}`
                        );
                    } else {
                        console.log(
                            `Berhasil menghapus gambar lama (tentang): ${existingTentang.image}`
                        );
                    }
                });
            }
        }

        const result = await Tentang.update(
            {
                ...tentang.data,
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
                errors: ['Tentang Kami not found'],
                message: 'Update Tentang Kami Gagal',
                data: null,
            });
        }

        await t.commit();
        res.status(200).json({
            errors: [],
            message: 'Update Tentang Kami success',
            data: kategori.data,
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/tentangController.js:updateTentang - ' +
                    error.message
            )
        );
    }
};

const getAllTentang = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search_query || '';
        const offset = limit * page;

        const whereCondition = {
            [Op.or]: [
                {
                    title: {
                        [Op.like]: `%${search}%`,
                    },
                },
            ],
        };

        const totalRows = await Tentang.count({
            where: whereCondition,
        });

        const totalPage = Math.ceil(totalRows / limit);

        const result = await Tentang.findAll({
            where: whereCondition,
            offset: offset,
            limit: limit,
            order: [['updated_at', 'DESC']],
        });

        if (!result || result.length === 0) {
            return res.status(404).json({
                errors: ['Tentang Kami tidak ditemukan'],
                message: 'Get Tentang Kami gagal',
                data: null,
            });
        }

        res.status(200).json({
            errors: [],
            message: 'Get Tentang Kami success',
            data: result,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage,
        });
    } catch (error) {
        next(
            new Error(
                'controllers/tentangController.js:getAllTentang - ' +
                    error.message
            )
        );
    }
};

const getTentangById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const tentang = await Tentang.findOne({
            where: {
                id: id,
            },
        });
        if (!tentang) {
            return res.status(404).json({
                errors: ['Tentang Kami not found'],
                message: 'Data Tentang Kami Tidak Ditemukan',
                data: null,
            });
        }
        res.status(200).json({
            errors: [],
            message: 'Data Tentang Kami berhasil ditemukan',
            data: tentang,
        });
    } catch (error) {
        next(
            new Error(
                'controllers/tentangController.js:getTentangById - ' +
                    error.message
            )
        );
    }
};

export { createTentang, updateTentang, getAllTentang, getTentangById };
