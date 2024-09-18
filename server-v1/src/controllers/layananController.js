import sequelize from '../utils/db.js';
import Layanan from '../models/layanan.js';
import { dataValid } from '../validation/dataValidation.js';
import { Op } from 'sequelize';
import fs from 'fs';

const createLayanan = async (req, res, next) => {
    const t = await sequelize.transaction();
    const valid = {
        name: 'required',
    };
    try {
        const layanan = await dataValid(valid, req.body);
        if (layanan.message.length > 0) {
            return res.status(400).json({
                errors: layanan.message,
                message: 'Gagal menambahkan layanan',
                data: null,
            });
        }
        const kategoriExists = await Layanan.findAll({
            where: {
                name: layanan.data.name,
            },
        });
        if (kategoriExists.length > 0) {
            return res.status(400).json({
                errors: ['Layanan telah tersedia'],
                message: 'Gagal menambahkan layanan',
                data: null,
            });
        }

        if (req.file) {
            layanan.data.image = req.file.path;
        }

        const result = await Layanan.create(
            {
                ...layanan.data,
            },
            {
                transaction: t,
            }
        );
        if (!result) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Layanan gagal ditambahkan'],
                message: 'Gagal menambahkan layanan',
                data: null,
            });
        } else {
            await t.commit();
            res.status(201).json({
                errors: null,
                message: 'Layanan baru berhasil ditambahkan',
                data: result,
            });
        }
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/layananKategoriController.js:createLayanan - ' +
                    error.message
            )
        );
    }
};

const updateLayanan = async (req, res, next) => {
    const t = await sequelize.transaction();
    const valid = {
        name: 'required',
    };
    try {
        const id = req.params.id;
        const layanan = await dataValid(valid, req.body);
        if (layanan.message.length > 0) {
            return res.status(400).json({
                errors: layanan.message,
                message: 'Gagal update layanan',
                data: layanan.data,
            });
        }

        const existingKategori = await Layanan.findOne({
            where: { id: id },
        });
        if (!existingKategori) {
            return res.status(404).json({
                errors: ['Layanan not found'],
                message: 'Update Layanan Gagal',
                data: null,
            });
        }

        if (req.file) {
            layanan.data.image = req.file.path; // Assuming you're using multer or similar for file uploads

            // Delete the old profile image if it exists and is different from the new one
            if (
                existingKategori.image &&
                existingKategori.image !== layanan.data.image
            ) {
                fs.unlink(existingKategori.image, (err) => {
                    if (err) {
                        console.error(
                            `Gagal menghapus gambar lama (layanan): ${err.message}`
                        );
                    } else {
                        console.log(
                            `Berhasil menghapus gambar lama (layanan): ${existingKategori.image}`
                        );
                    }
                });
            }
        }

        const result = await Layanan.update(
            {
                ...layanan.data,
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
                errors: ['Layanan not found'],
                message: 'Update Layanan Gagal',
                data: null,
            });
        }

        await t.commit();
        res.status(200).json({
            errors: [],
            message: 'Update Layanan success',
            data: layanan.data,
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controller/layananKategoriController.js:updateLayanan - ' +
                    error.message
            )
        );
    }
};

const deleteLayanan = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const id = req.params.id;

        const layanan = await Layanan.findByPk(id, { transaction: t });

        if (!layanan) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Layanan not found'],
                message: 'Delete Layanan gagal',
                data: null,
            });
        }

        const imagePath = layanan.image;

        const kategoriDelete = await Layanan.destroy({
            where: {
                id: id,
            },
            transaction: t,
        });
        if (!kategoriDelete) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Layanan not found'],
                message: 'Delete Layanan gagal',
                data: null,
            });
        }

        // Delete the image file if it exists
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
                    message: 'Delete Layanan gagal',
                    data: null,
                });
            }
        }

        await t.commit();
        return res.status(200).json({
            errors: [],
            message: 'Delete Layanan success',
            data: null,
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/layananKategoriController.js:deleteLayanan - ' +
                    error.message
            )
        );
    }
};

const getAllLayanan = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search_query || '';
        const offset = limit * page;

        const whereCondition = {
            [Op.or]: [
                {
                    name: {
                        [Op.like]: `%${search}%`,
                    },
                },
            ],
        };

        const totalRows = await Layanan.count({
            where: whereCondition,
        });

        const totalPage = Math.ceil(totalRows / limit);

        const result = await Layanan.findAll({
            where: whereCondition,
            offset: offset,
            limit: limit,
            order: [['updated_at', 'DESC']],
        });

        if (!result || result.length === 0) {
            return res.status(404).json({
                errors: ['Layanan tidak ditemukan'],
                message: 'Get Layanan gagal',
                data: null,
            });
        }

        res.status(200).json({
            errors: [],
            message: 'Get Layanan success',
            data: result,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage,
        });
    } catch (error) {
        next(
            new Error(
                'controllers/kategoriLayananController.js:getAllLayanan - ' +
                    error.message
            )
        );
    }
};

export { createLayanan, updateLayanan, deleteLayanan, getAllLayanan };
