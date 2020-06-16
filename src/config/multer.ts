import multer from 'multer';
import crypto from 'crypto';
import { resolve, extname } from 'path';

export default {
    storage: multer.diskStorage({
        destination: (req, res, cb) => {
            cb(null, resolve(__dirname, '..', '..', 'temp', 'uploads'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, res) => {
                if (err) {
                    return cb(err, null);
                }
                return cb(
                    null,
                    res.toString('hex') + extname(file.originalname),
                );
            });
        },
    }),
};
