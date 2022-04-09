import { ConfigModule as ConfigModuleRoot } from '@nestjs/config';
import * as Joi from 'joi';

export const ConfigModule = ConfigModuleRoot.forRoot({
  isGlobal: true,
  cache: true,
  validationSchema: Joi.object({
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
  }),
});
