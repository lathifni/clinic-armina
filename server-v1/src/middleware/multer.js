import multer from 'multer';
import path from 'path';
import fs from 'fs';

const layananKategoriStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'assets/images/layananKategori/';

        // Check if the directory exists, if not, create it
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const layananKategoriUpload = multer({
    storage: layananKategoriStorage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'), false);
        }
    },
});

const tentangStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'assets/images/tentang/';

        // Check if the directory exists, if not, create it
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const tentangUpload = multer({
    storage: tentangStorage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'), false);
        }
    },
});

export { layananKategoriUpload, tentangUpload };
