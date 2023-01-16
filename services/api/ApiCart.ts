import axios from 'axios';
import { API_GAMES_HOSTNAME, API_HOSTNAME } from '../../utils/utils';
import { UserData } from '../../components/UserDataModal/UserDataModal.types';
import { GameDto, UserPayData } from '../../types/games.types';

export const ApiCart = {
  sendUserInfo: async (username: string, userEmail: string, userPhone: string) => {
    return await axios
      .post<UserData>(`${API_HOSTNAME}/api/cart`, {
        username,
        userEmail,
        userPhone,
      })
      .then((res) => res.data);
  },
  getLiqpay: async (userPayData: UserPayData) => {
    return await axios.post<string>(`${API_GAMES_HOSTNAME}/liqpay`, userPayData).then(async (res) => res.data);
  },
};

export default ApiCart;
