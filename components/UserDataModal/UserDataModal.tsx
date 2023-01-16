import React from 'react';
import UiModal from '../UI/UiModal/UiModal';
import { UnpackNestedValue, useForm } from 'react-hook-form';
import UiValidationError from '../UI/UiValidationError/UiValidationError';
import UiButton from '../UI/UiButton/UIButton';
import { UserData } from './UserDataModal.types';
import ApiCart from '../../services/api/ApiCart';
import CART from '../../services/cart/gamesCart';
import { GamesShortInfoListDto } from '../../types/games.types';

type UserModalProps = {
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
  setIsPurchaseDone: (isPurchaseDone: boolean) => void;
};

const UserDataModal = ({ isModalVisible, setIsModalVisible, setIsPurchaseDone }: UserModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    defaultValues: {
      username: '',
      userEmail: '',
    },
  });

  const onSubmit = async (data: UnpackNestedValue<UserData>) => {
    const games: GamesShortInfoListDto = CART.items.map((item) => {
      return { gameId: item.id, count: item.quantity };
    });
    const liqpayLink = await ApiCart.getLiqpay({
      userEmail: data.userEmail,
      username: data.username,
      price: CART.getTotalPrice(),
      games,
    });
    const a = document.createElement('a');
    a.href = liqpayLink;
    a.target = '_blank';
    a.click();
    a.remove();
    setIsModalVisible(false);
    setIsPurchaseDone(true);
    CART.empty();
  };

  const inputClasses =
    'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500';

  return (
    <UiModal isVisible={isModalVisible} setIsVisible={setIsModalVisible} className="w-[700px]">
      <h1 className="font-medium text-3xl text-center px-20">Enter your contact data</h1>
      <form
        className="flex flex-col items-center pt-14 h-full w-full"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <div className="flex flex-col gap-2 w-3/4">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="username" className="text-xl">
              Name
            </label>
            <input
              id="username"
              className={inputClasses}
              type="text"
              {...register('username', {
                required: true,
                minLength: 3,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            {errors?.username?.type === 'required' && <UiValidationError errorText="This field is required" />}
            {errors?.username?.type === 'minLength' && (
              <UiValidationError errorText="Name must be more then 3 characters" />
            )}
            {errors?.username?.type === 'pattern' && <UiValidationError errorText="Use alphabetical characters only" />}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="userEmail" className="text-xl">
              Email
            </label>
            <input
              id="userEmail"
              className={inputClasses}
              type="text"
              {...register('userEmail', {
                required: true,
                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              })}
            />
            {errors?.userEmail?.type === 'required' && <UiValidationError errorText="This field is required" />}
            {errors?.userEmail?.type === 'pattern' && <UiValidationError errorText="Email should be valid!" />}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 pt-8 pb-2 text-xl justify-end">
          <UiButton type="reset" variant="cancel" text="Cancel" onClick={() => setIsModalVisible(false)} />
          <UiButton type="submit" variant="submit" text="Send" />
        </div>
      </form>
    </UiModal>
  );
};

export default UserDataModal;
