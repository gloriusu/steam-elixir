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
