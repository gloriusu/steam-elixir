import { useQuery } from 'react-query';
import { ApiGames } from '../services/api/ApiGames';
import { GamesListDto } from '../types/games.types';

const useGames = (page: number) => {
  const query = useQuery<GamesListDto>(['games', page], () => ApiGames.getGamesList(page, 10));

  return {
    games: query.data || [],
    refetch: query.refetch,
    isLoading: query.isLoading,
  };
};

export default useGames;
