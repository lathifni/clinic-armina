import Fasilitas from '../models/fasilitas.js';
import sequelize from '../utils/db.js';
import { dataValid } from '../validation/dataValidation.js';
import fs from 'fs';
import { Op } from 'sequelize';

const createFasilitas = async (req, res, next) => {
    const t = await sequelize.transaction();
    const valid = {
        nama: 'required',
    };

    try {
        const fasilitas = await dataValid(valid, req.body);
        if (fasilitas.message.length > 0) {
            return res.status(400).json({
                errors: fasilitas.message,
                message: 'Gagal menambahkan fasilitas',
                data: null,
            });
        }

        if (req.file) {
            fasilitas.data.image = req.file.path;
        }

        const result = await Fasilitas.create(
            {
                ...fasilitas.data,
            },
            {
                transaction: t,
            }
        );

        if (!result) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Fasilitas gagal ditambahkan'],
                message: 'Fasilitas gagal ditambahkan',
                data: null,
            });
        } else {
            await t.commit();
            res.status(201).json({
                errors: null,
                message: 'Fasilitas berhasil ditambahkan',
                data: result,
            });
        }
    } catch (error) {
        next(
            new Error(
                'controller/fasilitasController.js:createFasilitas - ' +
                    error.message
            )
        );
    }
};

const updateFasilitas = async (req, res, next) => {
    const t = await sequelize.transaction();
    const valid = {
        nama: 'required',
    };
    try {
        const id = req.params.id;
        const fasilitas = await dataValid(valid, req.body);

        if (fasilitas.message.length > 0) {
            return res.status(400).json({
                errors: fasilitas.message,
                message: 'Gagal update fasilitas',
                data: fasilitas.data,
            });
        }

        const existingFasilitas = await Fasilitas.findByPk(id);

        if (!existingFasilitas) {
            return res.status(404).json({
                errors: ['Fasilitas Not Found'],
                message: 'Gagal Mengupdate Fasilitas',
                data: null,
            });
        }

        if (req.file) {
            fasilitas.data.image = req.file.path;

            if (
                existingFasilitas.image &&
                existingFasilitas.image !== Fasilitas.data.image
            ) {
                fs.unlink(existingFasilitas.image, (err) => {
                    if (err) {
                        console.error(
                            `Gagal menghapus gambar lama (fasilitas): ${err.message}`
                        );
                    } else {
                        console.log(
                            `Berhasil menghapus gambar lama (fasilitas): ${existingFasilitas.image}`
                        );
                    }
                });
            }
        }

        const result = await Fasilitas.update(
            {
                ...fasilitas.data,
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
                errors: ['Fasilitas not found'],
                message: 'Update Fasilitas Gagal',
                data: null,
            });
        }

        await t.commit();
        res.status(200).json({
            errors: [],
            message: 'Update fasilitas success',
            data: fasilitas.data,
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controller/fasilitasController.js:updateFasilitas - ' +
                    error.message
            )
        );
    }
};

const deleteFasilitas = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const id = req.params.id;

        const fasilitas = await Fasilitas.findByPk(id, { transaction: t });

        if (!fasilitas) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Fasilitas not found'],
                message: 'Delete Fasilitas gagal',
                data: null,
            });
        }

        const imagePath = fasilitas.image;

        const fasilitasDelete = await Fasilitas.destroy({
            where: {
                id: id,
            },
            transaction: t,
        });

        if (!fasilitasDelete) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Fasilitas not found'],
                message: 'Delete Fasilitas gagal',
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
                    message: 'Delete Fasilitas gagal',
                    data: null,
                });
            }
        }

        await t.commit();
        return res.status(200).json({
            errors: [],
            message: 'Delete Fasilitas success',
            data: null,
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controller/fasilitasController.js:deleteFasilitas - ' +
                    error.message
            )
        );
    }
};

const getAllFasilitas = async (req, res, next) => {
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

        const totalRows = await Fasilitas.count({
            where: whereCondition,
        });

        const totalPage = Math.ceil(totalRows / limit);

        const result = await Fasilitas.findAll({
            where: whereCondition,
            offset: offset,
            limit: limit,
            order: [['updated_at', 'DESC']],
        });

        if (!result || result.length === 0) {
            return res.status(404).json({
                errors: ['Fasilitas tidak ditemukan'],
                message: 'Get Fasilitas gagal',
                data: null,
            });
        }

        res.status(200).json({
            errors: [],
            message: 'Get Fasilitas success',
            data: result,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage,
        });
    } catch (error) {
        next(
            new Error(
                'controller/fasilitasController.js:getAllFasilitas - ' +
                    error.message
            )
        );
    }
};

export { createFasilitas, updateFasilitas, deleteFasilitas, getAllFasilitas };
