import { Joi, celebrate } from 'celebrate';
import { REG_EXP_URL } from './reg-exps';

const customUrlValidation = (value: string, helpers: Joi.CustomHelpers<string>) => {
  if (!REG_EXP_URL.test(value)) {
    return helpers.error('string.url');
  }

  return value;
};

const PATTERN_URL = Joi.string().custom(customUrlValidation).required().messages({
  'string.url': 'Передана не корректная ссылка',
});

const PATTERN_ABOUT = {
  about: Joi.string().min(2).max(200).required()
    .messages({
      'string.max': 'Описание не может быть длинее 200 символов',
      'string.min': 'Описание не может быть короче 2 символов',
    }),
};

const PATTERN_AVATAR = {
  avatar: PATTERN_URL,
};

const PATTERN_EMAIL = {
  email: Joi.string().required()
    .messages({
      'any.required': 'Поле email является обязательным',
    }),
};

const PATTERN_MONGO_DB_ID = Joi.string().alphanum().length(24).required()
  .messages({
    'string.length': 'Длина идентификатора должна быть ровно 24 символа',
  });

const PATTERN_NAME = {
  name: Joi.string().min(2).max(30).required()
    .messages({
      'string.min': 'Имя не может быть короче 2 символов',
      'string.max': 'Имя не может быть длинее 30 символов',
    }),
};

const PATTERN_PASSWORD = {
  password: Joi.string().min(8).max(40).required()
    .messages({
      'any.required': 'Поле пароль является обязательным',
    }),
};

export const validateCreateUserData = () => celebrate({
  body: Joi.object().keys({
    ...PATTERN_ABOUT,
    ...PATTERN_AVATAR,
    ...PATTERN_EMAIL,
    ...PATTERN_PASSWORD,
    ...PATTERN_NAME,
  }),
});

export const validateLoginData = () => celebrate({
  body: Joi.object().keys({
    ...PATTERN_EMAIL,
    ...PATTERN_PASSWORD,
  }),
});

export const validationProfileUpdation = () => celebrate({
  body: Joi.object().keys({
    ...PATTERN_ABOUT,
    ...PATTERN_NAME,
  }),
});

export const validateAvatarUpdation = () => celebrate({
  body: Joi.object().keys({
    ...PATTERN_AVATAR,
  }),
});

export const validateRouteParamIds = (...args: string[]) => celebrate({
  params: Joi.object().keys({
    ...args.reduce((result, key) => ({
      ...result,
      [key]: PATTERN_MONGO_DB_ID,
    }), {} as Record<string, Joi.StringSchema<string>>),
  }),
});

export const validateCreateCardData = () => celebrate({
  body: Joi.object().keys({
    ...PATTERN_NAME,
    link: PATTERN_URL,
  }),
});
