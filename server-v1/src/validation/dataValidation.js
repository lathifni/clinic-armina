import validator from 'validator';
import { isExists, sanitization } from './sanitization.js';

const dataValid = async (valid, dt, req) => {
    let pesan = [];
    let dd = [];
    let data = await sanitization(dt);
    const message = await new Promise((resolve, reject) => {
        Object.entries(valid).forEach(async (item) => {
            const [key, value] = item;
            // if (isExists(valid[key])) {
            const validate = valid[key].split(',');
            dd = await new Promise((resolve, reject) => {
                let msg = [];
                validate.forEach((v) => {
                    switch (v) {
                        case 'required':
                            if (key === 'image') {
                                // Check if an image file is uploaded
                                if (!req.file) {
                                    msg.push(key + ' is required');
                                }
                            } else {
                                // Check for other fields in the body
                                if (!isExists(data[key])) {
                                    msg.push(key + ' is required');
                                } else {
                                    if (
                                        isExists(data[key]) &&
                                        validator.isEmpty(data[key])
                                    ) {
                                        msg.push(key + ' is required');
                                    }
                                }
                            }
                            break;

                        case 'isEmail':
                            if (
                                isExists(data[key]) &&
                                !validator.isEmail(data[key])
                            ) {
                                msg.push(key + ' is invalid email');
                            }
                            break;
                        case 'isStrongPassword':
                            if (
                                isExists(data[key]) &&
                                !validator.isStrongPassword(data[key])
                            ) {
                                msg.push(
                                    key +
                                        ' most be at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 symbol'
                                );
                            }
                            break;
                        default:
                            break;
                    }
                });
                resolve(msg);
            });
            // }
            pesan.push(...dd);
        });
        resolve(pesan);
    });
    return { message, data };
};

export { dataValid };
