import { Op } from 'sequelize';
import Layanan from '../models/layanan.js';
import Promo from '../models/promo.js';
import sequelize from '../utils/db.js';
import { dataValid } from '../validation/dataValidation.js';

const createPromo = async (req, res, next) => {
    const t = await sequelize.transaction();
    const valid = {
        image: 'required',
        layanan_id: 'required',
    };
    try {
        const promo = await dataValid(valid, req.body, req);

        if (promo.message.length > 0) {
            return res.status(400).json({
                errors: promo.message,
                message: 'Gagal menambah promo',
                data: null,
            });
        }

        const layananExists = await Layanan.findByPk(promo.data.layanan_id);
        if (!layananExists) {
            return res.status(400).json({
                errors: [
                    `Layanan dengan ID ${promo.data.layanan_id} tidak ditemukan`,
                ],
                message: 'Gagal menambah promo',
                data: null,
            });
        }

        if (req.file) {
            promo.data.image = req.file.path;
        }

        const result = await Promo.create(
            {
                ...promo.data,
            },
            {
                transaction: t,
            }
        );

        if (!result) {
            await t.rollback();
            return res.status(404).json({
                errors: ['promo gagal ditambahkan'],
                message: 'Gagal menambahkan promo',
                data: null,
            });
        } else {
            await t.commit();
            res.status(201).json({
                errors: null,
                message: 'Promo baru berhasil ditambahkan',
                data: result,
            });
        }
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controlllers/promoController.js:createPromo - ' + error.message
            )
        );
    }
};

const updatePromo = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const id = req.params.id;
        const promo = req.body;

        const existingPromo = await Promo.findByPk(id);

        if (!existingPromo) {
            return res.status(404).json({
                errors: ['Promo Not Found'],
                message: 'Update Promo Gagal',
                data: null,
            });
        }

        if (req.file) {
            promo.data.image = req.file.path; // Assuming you're using multer or similar for file uploads

            // Delete the old profile image if it exists and is different from the new one
            if (
                existingPromo.image &&
                existingPromo.image !== promo.data.image
            ) {
                fs.unlink(existingPromo.image, (err) => {
                    if (err) {
                        console.error(
                            `Gagal menghapus gambar lama (promo): ${err.message}`
                        );
                    } else {
                        console.log(
                            `Berhasil menghapus gambar lama (promo): ${existingPromo.image}`
                        );
                    }
                });
            }
        }

        const result = await Promo.update(
            {
                ...promo.data,
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
                errors: ['Promo not found'],
                message: 'Update Promo Gagal',
                data: null,
            });
        }

        await t.commit();
        res.status(200).json({
            errors: [],
            message: 'Update promo success',
            data: promo.data,
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controlllers/promoController.js:createPromo - ' + error.message
            )
        );
    }
};

const deletePromo = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const id = req.params.id;
        const promo = await Promo.findByPk(id, { transaction: t });

        if (!promo) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Promo not found'],
                message: 'Delete Promo gagal',
                data: null,
            });
        }

        const imagePath = promo.image;

        const promoDelete = await Promo.destroy({
            where: {
                id: id,
            },
            transaction: t,
        });

        if (!promoDelete) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Promo not found'],
                message: 'Delete Promo gagal',
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
                    message: 'Delete Promo gagal',
                    data: null,
                });
            }
        }

        await t.commit();
        return res.status(200).json({
            errors: [],
            message: 'Delete promo success',
            data: null,
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controlllers/promoController.js:deletePromo - ' + error.message
            )
        );
    }
};

const getAllPromo = async (req, res, next) => {
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

        const totalRows = await Promo.count({
            where: whereCondition,
            include: [
                {
                    model: Layanan,
                    required: true,
                },
            ],
        });

        const totalPage = Math.ceil(totalRows / limit);

        const result = await Promo.findAll({
            where: whereCondition,
            include: [{ model: Layanan, required: true }],
            offset: offset,
            limit: limit,
            order: [['updated_at', 'DESC']],
        });

        if (!result || result.length === 0) {
            return res.status(404).json({
                errors: ['Promo tidak ditemukan'],
                message: 'Get Promo gagal',
                data: null,
            });
        }

        res.status(200).json({
            errors: [],
            message: 'Get Promo success',
            data: result,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage,
        });
    } catch (error) {
        next(
            new Error(
                'controlllers/promoController.js:getAllPromo - ' + error.message
            )
        );
    }
};

const getPromoById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const promo = await Promo.findByPk(id);

        if (!promo) {
            return res.status(404).json({
                errors: ['Promo not found'],
                message: 'Data Promo Tidak Ditemukan',
                data: null,
            });
        }

        res.status(200).json({
            errors: [],
            message: 'Data Promo berhasil ditemukan',
            data: sunat,
        });
    } catch (error) {
        next(
            new Error(
                'controlllers/promoController.js:getPromoById - ' +
                    error.message
            )
        );
    }
};

export { createPromo, updatePromo, deletePromo, getAllPromo, getPromoById };
