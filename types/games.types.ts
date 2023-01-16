export type GenresDto = {
  id: number;
  genreName: string;
};

export type GameDto = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  releaseDate: string;
  price: number;
  quantity: number;
  genres: GenresDto[];
};

export type GamesListDto = GameDto[];

export type GameShortInfoDto = {
  gameId: number;
  count: number;
};

export type GamesShortInfoListDto = GameShortInfoDto[];

export type UserPayData = {
  username: string;
  price: number;
  userEmail: string;
  games: GamesShortInfoListDto;
};
