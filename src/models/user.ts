import { model, Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail';

import { REG_EXP_URL } from '../utils/reg-exps';
import IUser from '../interfaces/user';

const userSchema = new Schema<IUser>(
  {
    about: {
      type: String,
      minlength: 2,
      maxlength: 200,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (value: string) => REG_EXP_URL.test(value),
        message: 'Не корректная ссылка для аватара',
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      validate: {
        validator: (value: string) => isEmail(value),
        message: 'email указан не верно',
      },
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  // убирает поле __v
  { versionKey: false },
);

export default model<IUser>('user', userSchema);
