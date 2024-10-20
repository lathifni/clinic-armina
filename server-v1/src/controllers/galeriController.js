import sequelize from '../utils/db.js';
import Galeri from '../models/galeri.js';
import { dataValid } from '../validation/dataValidation.js';
import Layanan from '../models/layanan.js';
import { Op } from 'sequelize';

const createGaleri = async (req, res, next) => {
    const t = sequelize.transaction();
    const valid = {
        layanan_id: 'required',
        image: 'required',
    };

    try {
        const galeri = await dataValid(valid, req.body);

        if (galeri.message.length > 0) {
            return res.status(400).json({
                errors: galeri.message,
                message: 'Gagal menambahkan galeri',
                data: null,
            });
        }

        const layananExists = await Layanan.findByPk(galeri.data.layanan_id);
        if (!layananExists) {
            return res.status(400).json({
                errors: [
                    `Layanan dengan ID ${galeri.data.layanan_id} tidak ditemukan`,
                ],
                message: 'Gagal menambah promo',
                data: null,
            });
        }

        if (req.file) {
            galeri.data.image = req.file.path;
        }

        const result = await Galeri.create(
            {
                ...galeri.data,
            },
            {
                transaction: t,
            }
        );

        if (!result) {
            await t.rollback();
            return res.status(404).json({
                errors: ['galeri gagal ditambahkan'],
                message: 'Gagal menambahkan galeri',
                data: null,
            });
        } else {
            await t.commit();
            res.status(201).json({
                errors: null,
                message: 'Galeri baru berhasil ditambahkan',
                data: result,
            });
        }
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/galerController.js:createGaleri - ' + error.message
            )
        );
    }
};

const updateGaleri = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const id = req.params.id;
        const galeri = req.body;

        const existingGaleri = await Galeri.findByPk(id);

        if (!existingGaleri) {
            return res.status(404).json({
                errors: ['Galeri Not Found'],
                message: 'Update Galeri Gagal',
                data: null,
            });
        }

        if (req.file) {
            galeri.data.image = req.file.path; // Assuming you're using multer or similar for file uploads

            // Delete the old profile image if it exists and is different from the new one
            if (
                existingGaleri.image &&
                existingGaleri.image !== galeri.data.image
            ) {
                fs.unlink(existingGaleri.image, (err) => {
                    if (err) {
                        console.error(
                            `Gagal menghapus gambar lama (galeri): ${err.message}`
                        );
                    } else {
                        console.log(
                            `Berhasil menghapus gambar lama (galeri): ${existingGaleri.image}`
                        );
                    }
                });
            }
        }

        const result = await Galeri.update(
            {
                ...galeri.data,
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
                errors: ['Galeri not found'],
                message: 'Update Galeri Gagal',
                data: null,
            });
        }

        await t.commit();
        res.status(200).json({
            errors: [],
            message: 'Update galeri success',
            data: galeri.data,
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/galerController.js:updateGaleri - ' + error.message
            )
        );
    }
};

const deleteGaleri = async (req, res, next) => {
    const t = await sequelize.transaction();

    try {
        const id = req.params.id;
        const galeri = await Galeri.findByPk(id);

        if (!galeri) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Galeri not found'],
                message: 'Delete Galeri gagal',
                data: null,
            });
        }

        const imagePath = galeri.image;

        const galeriDelete = await Galeri.destroy({
            where: {
                id: id,
            },
            transaction: t,
        });

        if (!galeriDelete) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Galeri not found'],
                message: 'Delete Galeri gagal',
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
                    message: 'Delete Galeri gagal',
                    data: null,
                });
            }
        }

        await t.commit();
        return res.status(200).json({
            errors: [],
            message: 'Delete galeri success',
            data: null,
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/galerController.js:deleteGaleri - ' + error.message
            )
        );
    }
};

const getAllGaleri = async (req, res, next) => {
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
            ],
        };

        const totalRows = await Galeri.count({
            where: whereCondition,
            include: [
                {
                    model: Layanan,
                    required: true,
                },
            ],
        });

        const totalPage = Math.ceil(totalRows / limit);

        const result = await Galeri.findAll({
            where: whereCondition,
            include: [{ model: Layanan, required: true }],
            offset: offset,
            limit: limit,
            order: [['updated_at', 'DESC']],
        });

        if (!result || result.length === 0) {
            return res.status(404).json({
                errors: ['Galeri tidak ditemukan'],
                message: 'Get Galeri gagal',
                data: null,
            });
        }

        res.status(200).json({
            errors: [],
            message: 'Get Galeri success',
            data: result,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage,
        });
    } catch (error) {
        next(
            new Error(
                'controllers/galerController.js:getAllGaleri - ' + error.message
            )
        );
    }
};

export { createGaleri, updateGaleri, deleteGaleri, getAllGaleri };
