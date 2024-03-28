import mongoose from 'mongoose';

import ICard from '../interfaces/card';
import { REG_EXP_URL } from '../utils/reg-exps';

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => REG_EXP_URL.test(value),
      message: 'Не корректная ссылка для аватара',
    },
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    require: true,
  },
  likes: {
    type: [mongoose.Schema.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ICard>('card', cardSchema);
