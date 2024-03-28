interface IUser {
  _id: string;
  about: string;
  avatar: string;
  email:string;
  name: string;
  password: string;
}

export type UserUpdatableKey = 'about' | 'avatar' | 'name';

export type UserUpdatePayload = Pick<IUser, UserUpdatableKey>;

export default IUser;
