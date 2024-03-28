import IUser from '../interfaces/user';

const mapUser = (user: IUser) => ({
  _id: user._id,
  name: user.name,
  about: user.about,
  avatar: user.avatar,
  email: user.email,
});

export default mapUser;
