import { UploadResponse } from "./UploadFileResponse";

export interface UploaderServiceInterface {
    upload(file: Express.Multer.File, dest?: string) : Promise<UploadResponse>
    remove(key: string) : Promise<void>
}