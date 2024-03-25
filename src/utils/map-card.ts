import ICard from '../interfaces/card';

const mapCard = (card: ICard): ICard => ({
  _id: card._id,
  createdAt: card.createdAt,
  link: card.link,
  likes: card.likes,
  name: card.name,
  owner: card.owner,
});

export default mapCard;
