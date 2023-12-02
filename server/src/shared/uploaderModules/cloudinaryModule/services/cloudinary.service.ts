import { Inject, InternalServerErrorException } from '@nestjs/common';
import {  v2 as cloudinary } from 'cloudinary';
import { UploaderServiceInterface } from '../../shared/interfaces/Uploader.service.interface';
import { UploadResponse } from '../../shared/interfaces/UploadFileResponse';
import { CloudinaryModuleOption } from "../interfaces/cloudinary.moduleOptions.interface"
import { MODULE_OPTIONS_TOKEN } from '../cloudinary.moduleDefination';

export class CloudinaryService implements UploaderServiceInterface{
  constructor (@Inject(MODULE_OPTIONS_TOKEN) private options: CloudinaryModuleOption) {
    cloudinary.config({
      cloud_name: options.cloudName,
      api_key: options.apiKey,
      api_secret: options.apiSecret
    });
  }
  async upload(file: Express.Multer.File, dest?: string): Promise<UploadResponse> {
    try {
      let {secure_url, original_filename, public_id } = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`, {
        resource_type: 'auto',
        public_id: file.originalname || undefined,
        overwrite: true,
      });
      console.log("this is public id of uploaded image" + public_id)
      return { url: secure_url, filename: original_filename}
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
  async remove(key: string): Promise<void> {
    try {
      let res= await cloudinary.uploader.destroy(this.extractPublicIdFromUrl(key));
      console.log("delete result", res)
    } catch (error) {
      throw new Error('Failed to remove image from Cloudinary');
    }
  }
  private extractPublicIdFromUrl(url: string) {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    const partsimageName = filename.split('.');
    return partsimageName[0] + "." + partsimageName[1] // Return null if no publicId found
  }
}

// return new Promise<UploadApiErrorResponse | UploadApiResponse>((resolve, reject) => {
//   cloudinary.uploader.upload_stream(
//     (error, result) => {
//       if (error) return reject(error);
//       resolve(result);
//     },
//   ).end(file.buffer);
// });

// async uploadImage(
  //   file: Express.Multer.File,
  // ): Promise<UploadApiResponse> {
    
  //   // return new Promise<UploadApiErrorResponse | UploadApiResponse>((resolve, reject) => {
  //   //   cloudinary.uploader.upload_stream(
  //   //     (error, result) => {
  //   //       if (error) return reject(error);
  //   //       resolve(result);
  //   //     },
  //   //   ).end(file.buffer);
  //   // });
  // }
  // async removeImage(secureUrl: string): Promise<void> {
  //   try {
  //     await cloudinary.uploader.destroy(secureUrl);
  //   } catch (error) {
  //     throw new Error('Failed to remove image from Cloudinary');
  //   }
  // }