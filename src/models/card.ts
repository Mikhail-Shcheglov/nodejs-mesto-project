import { model, Schema } from 'mongoose';

import ICard from '../interfaces/card';
import { REG_EXP_URL } from '../utils/reg-exps';

const cardSchema = new Schema({
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
      message: 'Передана не корректная ссылка',
    },
  },
  owner: {
    type: Schema.ObjectId,
    ref: 'user',
    require: true,
  },
  likes: {
    type: [Schema.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<ICard>('card', cardSchema);
