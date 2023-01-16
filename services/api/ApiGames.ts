import axios from 'axios';
import { API_GAMES_HOSTNAME } from '../../utils/utils';
import { GameDto, GamesListDto } from '../../types/games.types';

export const ApiGames = {
  getGamesList: async (page: number, count: number) => {
    return await axios
      .get<GamesListDto>(`${API_GAMES_HOSTNAME}/game?page=${page}&count=${count}`)
      .then((res) => res.data);
  },
  getGameById: async (productId: number) => {
    return await axios.get<GameDto>(`${API_GAMES_HOSTNAME}/game/${productId}`).then((res) => res.data);
  },
};
