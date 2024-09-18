import sequelize from '../utils/db.js';
import { dataValid } from '../validation/dataValidation.js';
import { Op } from 'sequelize';
import fs from 'fs';
import SubLayanan from '../models/subLayanan.js';

const createSubLayanan = async (req, res, next) => {
    const t = await sequelize.transaction();
    const valid = {
        nama: 'required',
        deskripsi: 'required',
        harga: 'required',
        layanan_id: 'required',
    };
    try {
        const subLayanan = dataValid(valid, req.body);
        if (subLayanan.message.length > 0) {
            return res.status(400).json({
                errors: subLayanan.message,
                message: 'Gagal menambahkan sub Layanan',
                data: null,
            });
        }

        if (req.file) {
            subLayanan.data.image = req.file.path;
        }

        const result = await SubLayanan.create(
            {
                ...subLayanan.data,
            },
            {
                transaction: t,
            }
        );
        if (!result) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Sub Layanan gagal ditambahkan'],
                message: 'Gagal menambahkan Sub Layanan',
                data: null,
            });
        } else {
            await t.commit();
            res.status(201).json({
                errors: null,
                message: 'Sub Layanan baru berhasil ditambahkan',
                data: result,
            });
        }
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/subLayananController.js:createSubLayanan - ' +
                    error.message
            )
        );
    }
};

const updateSubLayanan = async (req, res, next) => {
    const t = await sequelize.transaction();
    const valid = {
        nama: 'required',
        deskripsi: 'required',
        harga: 'required',
        layanan_id: 'required',
    };
    try {
        const id = req.params.id;
        const subLayanan = await dataValid(valid, req.body);

        if (subLayanan.message.length > 0) {
            return res.status(400).json({
                errors: layanan.message,
                message: 'Gagal update layanan',
                data: layanan.data,
            });
        }

        const existingSubLayanan = await SubLayanan.findByPk(id);

        if (!existingSubLayanan) {
            return res.status(404).json({
                errors: ['Sub Layanan not found'],
                message: 'Update Sub Layanan Gagal',
                data: null,
            });
        }

        if (req.file) {
            subLayanan.data.image = req.file.path; // Assuming you're using multer or similar for file uploads

            // Delete the old profile image if it exists and is different from the new one
            if (
                existingSubLayanan.image &&
                existingSubLayanan.image !== subLayanan.data.image
            ) {
                fs.unlink(existingSubLayanan.image, (err) => {
                    if (err) {
                        console.error(
                            `Gagal menghapus gambar lama (sub layanan): ${err.message}`
                        );
                    } else {
                        console.log(
                            `Berhasil menghapus gambar lama (sub layanan): ${existingKategori.image}`
                        );
                    }
                });
            }
        }

        const result = SubLayanan.update(
            {
                ...subLayanan.data,
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
                errors: ['Sub Layanan not found'],
                message: 'Update Sub Layanan Gagal',
                data: null,
            });
        }

        await t.commit();
        res.status(200).json({
            errors: [],
            message: 'Update sub layanan success',
            data: subLayanan.data,
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/subLayananController.js:updateSubLayanan - ' +
                    error.message
            )
        );
    }
};

const deleteSubLayanan = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const id = req.params.id;
        const subLayanan = await SubLayanan.findByPk(id);

        if (!subLayanan) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Sub Layanan not found'],
                message: 'Delete Sub Layanan gagal',
                data: null,
            });
        }

        const imagePath = subLayanan.image;

        const subLayananDelete = await SubLayanan.destroy({
            where: {
                id: id,
            },
            transaction: t,
        });

        if (!subLayananDelete) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Sub Layanan not found'],
                message: 'Delete Sub Layanan gagal',
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
                    message: 'Delete Sub Layanan gagal',
                    data: null,
                });
            }
        }

        await t.commit();
        return res.status(200).json({
            errors: [],
            message: 'Delete sub layanan success',
            data: null,
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/subLayananController.js:deleteSubLayanan - ' +
                    error.message
            )
        );
    }
};

const getAllSubLayanan = async (req, res, next) => {
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

        const totalRows = await SubLayanan.count({
            where: whereCondition,
        });

        const totalPage = Math.ceil(totalRows / limit);

        const result = await SubLayanan.findAll({
            where: whereCondition,
            offset: offset,
            limit: limit,
            order: [['updated_at', 'DESC']],
        });

        if (!result || result.length === 0) {
            return res.status(404).json({
                errors: ['Sub Layanan tidak ditemukan'],
                message: 'Get Sub Layanan gagal',
                data: null,
            });
        }

        res.status(200).json({
            errors: [],
            message: 'Get Sub layanan success',
            data: result,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage,
        });
    } catch (error) {
        next(
            new Error(
                'controllers/subLayananController.js:getAllSubLayanan - ' +
                    error.message
            )
        );
    }
};

export {
    createSubLayanan,
    updateSubLayanan,
    deleteSubLayanan,
    getAllSubLayanan,
};
