import axios from 'axios';
import { API_HOSTNAME } from '../../utils/utils';
import { UserData } from '../../components/UserDataModal/UserDataModal.types';

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
};

export default ApiCart;
