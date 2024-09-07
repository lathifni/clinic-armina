import bcrypt from 'bcrypt';
const saltRounds = 10;

const encrypt = (password) => {
    return bcrypt.hashSync(password, saltRounds);
};

const compare = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

export { encrypt, compare };
