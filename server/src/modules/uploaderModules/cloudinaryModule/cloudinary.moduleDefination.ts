import { ConfigurableModuleBuilder } from '@nestjs/common';
import { CloudinaryModuleOption } from './interfaces/cloudinary.moduleOptions.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, ASYNC_OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<CloudinaryModuleOption>().build();