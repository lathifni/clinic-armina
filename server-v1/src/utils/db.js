import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: process.env.DB_DIALECT || 'mysql',
        logging:
            process.env.NODE_ENV === 'development'
                ? (...msg) => console.log(msg)
                : false,
        dialectOptions: {
            dateStrings: true,
            typeCast(field, next) {
                // for reading from database
                if (field.type === 'DATETIME') {
                    return field.string();
                }
                return next();
            },
        },
        timezone: '+07:00',
        insecureAuth: false,
    }
);

export default sequelize;
