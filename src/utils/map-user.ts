import IUser from '../interfaces/user';

const mapUser = (user: IUser) => ({
  _id: user._id,
  name: user.name,
  about: user.about,
  avatar: user.avatar,
});

export default mapUser;
