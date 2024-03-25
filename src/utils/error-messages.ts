import { HTTP_STATUS } from './constants';

const {
  BAD_REQUEST,
  FORBIDDEN,
  NOT_FOUND,
} = HTTP_STATUS;

const ERROR_MESSAGES = {
  USER: {
    [NOT_FOUND]: 'Пользователь по указанному _id не найден',

    ADD: {
      [BAD_REQUEST]: 'Переданы некорректные данные при создании пользователя',
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
      [FORBIDDEN]: 'Не прав на удаление карты с указанным id',
    },
    LIKE: {
      [BAD_REQUEST]: 'Переданы некорректные данные для постановки/снятии лайка',
      [NOT_FOUND]: 'Передан несуществующий _id карточки',
    },
  },
};

export default ERROR_MESSAGES;
