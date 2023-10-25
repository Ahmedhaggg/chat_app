import { Module } from '@nestjs/common';
import { CloudinaryService } from './services/cloudinary.service';
import { ConfigurableModuleClass, ASYNC_OPTIONS_TYPE } from './cloudinary.moduleDefination';

@Module({
    providers: [CloudinaryService],
    exports: [CloudinaryService]
})
export class CloudinaryModule extends ConfigurableModuleClass {
    static registerAsync(options: typeof ASYNC_OPTIONS_TYPE) {
        return {
            ...super.registerAsync(options),
            global: true
        }
    }
}
