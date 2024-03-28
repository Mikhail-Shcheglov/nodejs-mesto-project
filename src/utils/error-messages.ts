import { HTTP_STATUS } from './constants';

const {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
} = HTTP_STATUS;

const ERROR_MESSAGES = {
  USER: {
    [NOT_FOUND]: 'Пользователь по указанному _id не найден',
    [UNAUTHORIZED]: 'Не авторизованный запрос',

    ADD: {
      [BAD_REQUEST]: 'Переданы некорректные данные при создании пользователя',
      [CONFLICT]: 'Пользователь с указанной почтой уже существует.',
    },
    LOGIN: {
      [UNAUTHORIZED]: 'Неправильные почта или пароль',
    },
    PROFILE_UPDATE: {
      [BAD_REQUEST]: 'Переданы некорректные данные при обновлении профиля',
    },
    PROFILE_AVATAR_UPDATE: {
      [BAD_REQUEST]: 'Переданы некорректные данные при обновлении аватара',
    },
  },

  CARD: {
    [BAD_REQUEST]: 'Переданы некорректные данные при создании карточки',
    [NOT_FOUND]: 'Карточка с указанным _id не найдена.',

    DELETE: {
      [FORBIDDEN]: 'Попытка удалить чужую карточку',
    },
    LIKE: {
      [BAD_REQUEST]: 'Переданы некорректные данные для постановки/снятии лайка',
      [NOT_FOUND]: 'Передан несуществующий _id карточки',
    },
  },
};

export default ERROR_MESSAGES;
