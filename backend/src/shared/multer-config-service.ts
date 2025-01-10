import {diskStorage} from 'multer';
import {v4 as uuidv4} from 'uuid';
import {extname} from 'path';
import {Injectable} from "@nestjs/common";
import {MulterModuleOptions, MulterOptionsFactory} from "@nestjs/platform-express";

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    createMulterOptions(): MulterModuleOptions {
        return {
            fileFilter: (req, file, callback) => {
                if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
                    return callback(new Error('Only image files are allowed!'), false);
                }
                callback(null, true);
            },
            storage: diskStorage({
                destination: './upload-images',
                filename: (req, file, callback) => {
                    const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
                    callback(null, uniqueSuffix);
                },
            }),
            dest: './upload-images',
        };
    }
}
