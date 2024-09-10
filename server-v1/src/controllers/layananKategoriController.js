import sequelize from '../utils/db.js';
import LayananKategori from '../models/layanan_kategori.js';
import { dataValid } from '../validation/dataValidation.js';
import { Op } from 'sequelize';
import fs from 'fs';

const createLayananKategori = async (req, res, next) => {
    const t = await sequelize.transaction();
    const valid = {
        name: 'required',
    };
    try {
        const kategori = await dataValid(valid, req.body);
        if (kategori.message.length > 0) {
            return res.status(400).json({
                errors: kategori.message,
                message: 'Gagal menambahkan kategori',
                data: null,
            });
        }
        const kategoriExists = await LayananKategori.findAll({
            where: {
                name: kategori.data.name,
            },
        });
        if (kategoriExists.length > 0) {
            return res.status(400).json({
                errors: ['Kategori telah tersedia'],
                message: 'Gagal menambahkan kategori',
                data: null,
            });
        }

        if (req.file) {
            kategori.data.image = req.file.path;
        }

        const result = await LayananKategori.create(
            {
                ...kategori.data,
            },
            {
                transaction: t,
            }
        );
        if (!result) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Kategori gagal ditambahkan'],
                message: 'Gagal menambahkan kategori',
                data: null,
            });
        } else {
            await t.commit();
            res.status(201).json({
                errors: null,
                message: 'Kategori baru berhasil ditambahkan',
                data: result,
            });
        }
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/layananKategoriController.js:createLayananKategori - ' +
                    error.message
            )
        );
    }
};

const updateLayananKategori = async (req, res, next) => {
    const valid = {
        name: 'required',
    };
    try {
        const id = req.params.id;
        const kategori = await dataValid(valid, req.body);
        if (kategori.message.length > 0) {
            return res.status(400).json({
                errors: kategori.message,
                message: 'Gagal update kategori',
                data: kategori.data,
            });
        }

        const existingKategori = await LayananKategori.findOne({
            where: { id: id },
        });
        if (!existingKategori) {
            return res.status(404).json({
                errors: ['Kategori not found'],
                message: 'Update Kategori Gagal',
                data: null,
            });
        }

        if (req.file) {
            kategori.data.image = req.file.path; // Assuming you're using multer or similar for file uploads

            // Delete the old profile image if it exists and is different from the new one
            if (
                existingKategori.image &&
                existingKategori.image !== kategori.data.image
            ) {
                fs.unlink(existingKategori.image, (err) => {
                    if (err) {
                        console.error(
                            `Gagal menghapus gambar lama (kategori): ${err.message}`
                        );
                    } else {
                        console.log(
                            `Berhasil menghapus gambar lama (kategori): ${existingKategori.image}`
                        );
                    }
                });
            }
        }

        const result = await LayananKategori.update(
            {
                ...kategori.data,
            },
            {
                where: {
                    id: id,
                },
            }
        );

        if (result[0] === 0) {
            // Check if any row was updated
            return res.status(404).json({
                errors: ['Kategori not found'],
                message: 'Update Kategori Gagal',
                data: null,
            });
        }

        res.status(200).json({
            errors: [],
            message: 'Update Kategori success',
            data: kategori.data,
        });
    } catch (error) {
        next(
            new Error(
                'controller/layananKategoriController.js:updateLayananKategori - ' +
                    error.message
            )
        );
    }
};

const deleteLayananKategori = async (req, res, next) => {
    try {
        const id = req.params.id;

        const kategori = await LayananKategori.findByPk(id);

        if (!kategori) {
            return res.status(404).json({
                errors: ['Kategori not found'],
                message: 'Delete Kategori gagal',
                data: null,
            });
        }

        const imagePath = kategori.image;

        const kategoriDelete = LayananKategori.destroy({
            where: {
                id: id,
            },
        });
        if (!kategoriDelete) {
            return res.status(404).json({
                errors: ['Kategori not found'],
                message: 'Delete Kategori gagal',
                data: null,
            });
        }

        // Delete the image file if it exists
        if (imagePath) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Failed to delete image: ${err.message}`);
                } else {
                    console.log(`Successfully deleted image: ${imagePath}`);
                }
            });
        }

        return res.status(200).json({
            errors: [],
            message: 'Delete Kategori success',
            data: null,
        });
    } catch (error) {
        // Handle specific error related to foreign key constraint violation
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({
                errors: [error.message],
                message:
                    'Kategori tidak dapat dihapus karena masih ada buku terkait',
                data: null,
            });
        }
        next(
            new Error(
                'controllers/layananKategoriController.js:deleteLayananKategori - ' +
                    error.message
            )
        );
    }
};

const getAllLayananKategori = async (req, res, next) => {
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

        const totalRows = await LayananKategori.count({
            where: whereCondition,
        });

        const totalPage = Math.ceil(totalRows / limit);

        const result = await LayananKategori.findAll({
            where: whereCondition,
            offset: offset,
            limit: limit,
            order: [['updated_at', 'DESC']],
        });

        if (!result || result.length === 0) {
            return res.status(404).json({
                errors: ['Kategori tidak ditemukan'],
                message: 'Get Kategori gagal',
                data: null,
            });
        }

        res.status(200).json({
            errors: [],
            message: 'Get Kategori success',
            data: result,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage,
        });
    } catch (error) {
        next(
            new Error(
                'controllers/kategoriLayananController.js:getAllLayananKategori - ' +
                    error.message
            )
        );
    }
};

export {
    createLayananKategori,
    updateLayananKategori,
    deleteLayananKategori,
    getAllLayananKategori,
};
