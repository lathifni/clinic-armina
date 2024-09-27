import Sunat from '../models/sunat.js';
import sequelize from '../utils/db.js';
import { dataValid } from '../validation/dataValidation.js';
import fs from 'fs';
import { Op } from 'sequelize';

const createSunat = async (req, res, next) => {
    const t = await sequelize.transaction();
    const valid = {
        nama: 'required',
        deskripsi: 'required',
    };

    try {
        const sunat = await dataValid(valid, req.body);

        if (sunat.message.length > 0) {
            return res.status(400).json({
                errors: layanan.message,
                message: 'Gagal menambahkan layanan',
                data: null,
            });
        }

        if (req.file) {
            sunat.data.image = req.file.path;
        }

        const result = await Sunat.create(
            {
                ...sunat.data,
            },
            {
                transaction: t,
            }
        );

        if (!result) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Sunat gagal ditambahkan'],
                message: 'Gagal menambahkan Sunat',
                data: null,
            });
        } else {
            await t.commit();
            res.status(201).json({
                errors: null,
                message: 'Sunat baru berhasil ditambahkan',
                data: result,
            });
        }
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/sunatController.js/createSunat - ' + error.message
            )
        );
    }
};

const updateSunat = async (req, res, next) => {
    const t = await sequelize.transaction();
    const valid = {
        nama: 'required',
        deskripsi: 'required',
    };

    try {
        const id = req.params.id;
        const sunat = await dataValid(valid, req.body);

        if (sunat.message.length > 0) {
            return res.status(400).json({
                errors: sunat.message,
                message: 'Gagal update Tenaga Medis',
                data: sunat.data,
            });
        }

        const existingSunat = await Sunat.findByPk(id);

        if (!existingSunat) {
            return res.status(404).json({
                errors: ['Tenaga Medis Not Found'],
                message: 'Update Tenaga Medis Gagal',
                data: null,
            });
        }

        if (req.file) {
            sunat.data.image = req.file.path; // Assuming you're using multer or similar for file uploads

            // Delete the old profile image if it exists and is different from the new one
            if (
                existingSunat.image &&
                existingSunat.image !== sunat.data.image
            ) {
                fs.unlink(existingSunat.image, (err) => {
                    if (err) {
                        console.error(
                            `Gagal menghapus gambar lama (sunat): ${err.message}`
                        );
                    } else {
                        console.log(
                            `Berhasil menghapus gambar lama (sunat): ${existingSunat.image}`
                        );
                    }
                });
            }
        }

        const result = await Sunat.update(
            {
                ...sunat.data,
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
                errors: ['Sunat not found'],
                message: 'Update Sunat Gagal',
                data: null,
            });
        }

        await t.commit();
        res.status(200).json({
            errors: [],
            message: 'Update Sunat success',
            data: sunat.data,
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/sunatController.js/updateSunat - ' + error.message
            )
        );
    }
};

const deleteSunat = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const id = req.params.id;
        const sunat = await Sunat.findByPk(id, { transaction: t });

        if (!sunat) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Sunat not found'],
                message: 'Delete Sunat gagal',
                data: null,
            });
        }

        const imagePath = sunat.image;

        const sunatDelete = await Sunat.destroy({
            where: {
                id: id,
            },
            transaction: t,
        });

        if (!sunatDelete) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Sunat not found'],
                message: 'Delete Sunat gagal',
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
                    message: 'Delete Sunat gagal',
                    data: null,
                });
            }
        }

        await t.commit();
        return res.status(200).json({
            errors: [],
            message: 'Delete sunat success',
            data: null,
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/sunatController.js/deleteSunat - ' + error.message
            )
        );
    }
};

const getAllSunat = async (req, res, next) => {
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

        const totalRows = await Sunat.count({
            where: whereCondition,
        });

        const totalPage = Math.ceil(totalRows / limit);

        const result = await Sunat.findAll({
            where: whereCondition,
            offset: offset,
            limit: limit,
            order: [['updated_at', 'DESC']],
        });

        if (!result || result.length === 0) {
            return res.status(404).json({
                errors: ['Sunat tidak ditemukan'],
                message: 'Get Sunat gagal',
                data: null,
            });
        }

        res.status(200).json({
            errors: [],
            message: 'Get Sunat success',
            data: result,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage,
        });
    } catch (error) {
        next(
            new Error(
                'controllers/sunatController.js/getAllSunat - ' + error.message
            )
        );
    }
};

const getSunatById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const sunat = await Sunat.findByPk(id);

        if (!sunat) {
            return res.status(404).json({
                errors: ['Sunat not found'],
                message: 'Data Sunat Tidak Ditemukan',
                data: null,
            });
        }

        res.status(200).json({
            errors: [],
            message: 'Data Sunat berhasil ditemukan',
            data: sunat,
        });
    } catch (error) {
        next(
            new Error(
                'controllers/sunatController.js/getSunatById - ' + error.message
            )
        );
    }
};

export { createSunat, updateSunat, deleteSunat, getAllSunat, getSunatById };
