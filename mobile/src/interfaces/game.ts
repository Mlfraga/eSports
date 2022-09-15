export default interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    ads: number
  }
}