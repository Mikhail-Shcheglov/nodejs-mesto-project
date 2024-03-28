import { Joi, celebrate } from 'celebrate';

const PATTERN_ABOUT = {
  about: Joi.string().min(2).max(200).messages({
    'string.max': 'Описание не может быть длинее 200 символов',
    'string.min': 'Описание не может быть короче 2 символов',
  }),
};

const PATTERN_AVATAR = {
  avatar: Joi.string().uri().messages({
    'string.uri': 'Ссылка для нового аватара должна быть валидной',
  }),
};

const PATTERN_EMAIL = {
  email: Joi.string().required()
    .messages({
      'any.required': 'Поле email является обязательным',
    }),
};

const PATTERN_NAME = {
  name: Joi.string().min(2).max(30)
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
