import sequelize from '../utils/db.js';
import { dataValid } from '../validation/dataValidation.js';
import { Op } from 'sequelize';
import fs from 'fs';
import TenagaMedis from '../models/tenagaMedis.js';

const createTenagaMedis = async (req, res, next) => {
    const t = await sequelize.transaction();
    const valid = {
        nama: 'required',
        jenis: 'required',
        waktu_mulai: 'required',
        waktu_selesai: 'required',
    };
    try {
        const tenagaMedis = await dataValid(valid, req.body);

        if (tenagaMedis.message.length > 0) {
            return res.status(400).json({
                errors: tenagaMedis.message,
                message: 'Gagal menambahkan tenaga medis',
                data: null,
            });
        }

        if (req.file) {
            tenagaMedis.data.image = req.file.path;
        }

        const result = await TenagaMedis.create(
            {
                ...tenagaMedis.data,
            },
            {
                transaction: t,
            }
        );

        if (!result) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Tenaga Medis gagal ditambahkan'],
                message: 'Gagal menambahkan Tenaga Medis',
                data: null,
            });
        } else {
            await t.commit();
            res.status(201).json({
                errors: null,
                message: 'Tenaga Medis baru berhasil ditambahkan',
                data: result,
            });
        }
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/tenagaMedisController.js:createTenagaMedis - ' +
                    error.message
            )
        );
    }
};

const updateTenagaMedis = async (req, res, next) => {
    const t = await sequelize.transaction();
    const valid = {
        nama: 'required',
        jenis: 'required',
        waktu_mulai: 'required',
        waktu_selesai: 'required',
    };
    try {
        const id = req.params.id;
        const tenagaMedis = await dataValid(valid, req.body);

        if (tenagaMedis.message.length > 0) {
            return res.status(400).json({
                errors: tenagaMedis.message,
                message: 'Gagal update Tenaga Medis',
                data: tenagaMedis.data,
            });
        }

        const existingTenagaMedis = await TenagaMedis.findByPk(id);

        if (!existingTenagaMedis) {
            return res.status(404).json({
                errors: ['Tenaga Medis Not Found'],
                message: 'Update Tenaga Medis Gagal',
                data: null,
            });
        }

        if (req.file) {
            tenagaMedis.data.image = req.file.path; // Assuming you're using multer or similar for file uploads

            // Delete the old profile image if it exists and is different from the new one
            if (
                existingTenagaMedis.image &&
                existingTenagaMedis.image !== tenagaMedis.data.image
            ) {
                fs.unlink(existingTenagaMedis.image, (err) => {
                    if (err) {
                        console.error(
                            `Gagal menghapus gambar lama (tenaga medis): ${err.message}`
                        );
                    } else {
                        console.log(
                            `Berhasil menghapus gambar lama (tenaga medis): ${existingKategori.image}`
                        );
                    }
                });
            }
        }

        const result = await TenagaMedis.update(
            {
                ...tenagaMedis.data,
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
                errors: ['Tenaga Medis not found'],
                message: 'Update Tenaga Medis Gagal',
                data: null,
            });
        }

        await t.commit();
        res.status(200).json({
            errors: [],
            message: 'Update tenaga medis success',
            data: tenagaMedis.data,
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/tenagaMedisController.js:updateTenagaMedis - ' +
                    error.message
            )
        );
    }
};

const deleteTenagaMedis = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const id = req.params.id;
        const tenagaMedis = await TenagaMedis.findByPk(id, { transaction: t });

        if (!tenagaMedis) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Tenaga medis not found'],
                message: 'Delete Tenaga medis gagal',
                data: null,
            });
        }

        const imagePath = tenagaMedis.image;

        const tenagaMedisDelete = await TenagaMedis.destroy({
            where: {
                id: id,
            },
            transaction: t,
        });

        if (!tenagaMedisDelete) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Tenaga medis not found'],
                message: 'Delete Tenaga medis gagal',
                data: null,
            });
        }

        if (imagePath) {
            try {
                fs.unlink(imagePath);
                console.log(`Successfully deleted image: ${imagePath}`);
            } catch (err) {
                console.error(`Failed to delete image: ${err.message}`);
                // Rollback transaction if the file deletion fails
                await t.rollback();
                return res.status(500).json({
                    errors: ['Failed to delete image'],
                    message: 'Delete Tenaga Medis gagal',
                    data: null,
                });
            }
        }

        await t.commit();
        return res.status(200).json({
            errors: [],
            message: 'Delete tenaga medis success',
            data: null,
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/tenagaMedisController.js:deleteTenagaMedis - ' +
                    error.message
            )
        );
    }
};

const getAllTenagaMedis = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search_query || '';
        const offset = limit * page;

        const whereCondition = {
            [Op.or]: [
                {
                    nama: {
                        [Op.like]: `%${search}%`,
                    },
                },
            ],
        };

        const totalRows = await TenagaMedis.count({
            where: whereCondition,
        });

        const totalPage = Math.ceil(totalRows / limit);

        const result = await TenagaMedis.findAll({
            where: whereCondition,
            offset: offset,
            limit: limit,
            order: [['updated_at', 'DESC']],
        });

        if (!result || result.length === 0) {
            return res.status(404).json({
                errors: ['Tenaga medis tidak ditemukan'],
                message: 'Get tenaga medis gagal',
                data: null,
            });
        }

        res.status(200).json({
            errors: [],
            message: 'Get tenaga medis success',
            data: result,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage,
        });
    } catch (error) {
        next(
            new Error(
                'controllers/tenagaMedisController.js:getAllTenagaMedis - ' +
                    error.message
            )
        );
    }
};

export {
    createTenagaMedis,
    updateTenagaMedis,
    deleteTenagaMedis,
    getAllTenagaMedis,
};
