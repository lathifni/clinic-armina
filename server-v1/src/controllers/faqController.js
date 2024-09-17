import Faq from '../models/faq.js';
import sequelize from '../utils/db.js';
import { dataValid } from '../validation/dataValidation.js';
import fs from 'fs';
import { Op, where } from 'sequelize';

const createFaq = async (req, res, next) => {
    const t = await sequelize.transaction();
    const valid = {
        pertanyaan: 'required',
        jawaban: 'required',
    };

    try {
        const faq = await dataValid(valid, req.body);

        if (faq.message.length > 0) {
            return res.status(400).json({
                errors: faq.message,
                message: 'Gagal menambahkan faq',
                data: null,
            });
        }

        const result = await Faq.create(
            {
                ...faq.data,
            },
            {
                transaction: t,
            }
        );

        if (!result) {
            await t.rollback();
            return res.status(400).json({
                errors: ['Faq gagal ditambahkan'],
                message: 'Faq gagal ditambahkan',
                data: null,
            });
        } else {
            await t.commit();
            res.status(201).json({
                errors: null,
                message: 'Faq berhasil ditambahkan',
                data: result,
            });
        }
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/faqController.js:createFaq - ' + error.message
            )
        );
    }
};

const updateFaq = async (req, res, next) => {
    const t = await sequelize.transaction();
    const valid = {
        pertanyaan: 'required',
        jawaban: 'required',
    };

    try {
        const id = req.params.id;
        const faq = await dataValid(valid, req.body);

        if (faq.message.length > 0) {
            return res.status(400).json({
                errors: faq.message,
                message: 'Gagal update faq',
                data: faq.data,
            });
        }

        const existingFaq = await Faq.findByPk(id);

        if (!existingFaq) {
            return res.status(404).json({
                errors: ['Faq Not Found'],
                message: 'Update Faq Gagal',
                data: null,
            });
        }

        const result = await Faq.update(
            {
                ...faq.data,
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
                errors: ['Faq not found'],
                message: 'Update Faq Gagal',
                data: null,
            });
        }

        await t.commit();
        res.status(200).json({
            errors: [],
            message: 'Update Faq success',
            data: faq.data,
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/faqController.js:updateFaq - ' + error.message
            )
        );
    }
};

const deleteFaq = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const id = req.params.id;
        const faq = await Faq.findByPk(id);

        if (!faq) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Faq not found'],
                message: 'Delete Faq gagal',
                data: null,
            });
        }

        const faqDelete = await Faq.destroy({
            where: {
                id: id,
            },
            transaction: t,
        });

        if (!faqDelete) {
            await t.rollback();
            return res.status(404).json({
                errors: ['Faq not found'],
                message: 'Delete Faq gagal',
                data: null,
            });
        }

        await t.commit();
        return res.status(200).json({
            errors: [],
            message: 'Delete Faq success',
            data: null,
        });
    } catch (error) {
        await t.rollback();
        next(
            new Error(
                'controllers/faqController.js:deleteFaq - ' + error.message
            )
        );
    }
};

const getAllFaq = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search_query || '';
        const offset = limit * page;

        const whereCondition = {
            [Op.or]: [
                {
                    pertanyaan: {
                        [Op.like]: `%${search}%`,
                    },
                },
            ],
        };

        const totalRows = await Faq.count({
            where: whereCondition,
        });

        const totalPage = Math.ceil(totalRows / limit);

        const result = await Faq.findAll({
            where: whereCondition,
            offset: offset,
            limit: limit,
            order: [['updated_at', 'DESC']],
        });

        if (!result || result.length === 0) {
            return res.status(404).json({
                errors: ['Faq tidak ditemukan'],
                message: 'Get Faq gagal',
                data: null,
            });
        }

        res.status(200).json({
            errors: [],
            message: 'Get Faq success',
            data: result,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage,
        });
    } catch (error) {
        next(
            new Error(
                'controllers/faqController.js:getAllFaq - ' + error.message
            )
        );
    }
};

export { createFaq, updateFaq, deleteFaq, getAllFaq };
