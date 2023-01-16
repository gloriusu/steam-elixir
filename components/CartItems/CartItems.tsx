import React, { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import CartIcon from '../Icons/CartIcon';
import { useRouter } from 'next/router';
import UserDataModal from '../UserDataModal/UserDataModal';
import Portal from '../../HOC/Portal';
import CART from '../../services/cart/gamesCart';
import Image from 'next/image';
import { GameDto, GamesListDto } from '../../types/games.types';

type CartItemsProps = {
  items: GamesListDto;
  setIsPurchaseDone?: (isPurchaseDone: boolean) => void;
} & React.ComponentProps<'div'>;

const CartItems = ({ className, items, setIsPurchaseDone }: CartItemsProps) => {
  const router = useRouter();
  const [isPurchaseModalVisible, setIsPurchaseModalVisible] = useState(false);
  const isCartPage = router.pathname === '/cart';
  const cartButtonClasses =
    'flex items-center justify-center gap-1 bg-black text-white rounded-xl px-3 py-2 hover:bg-gray-800';
  return (
    <div className={clsx('sticky flex flex-col w-1/4 mr-3 ml-5 h-3/5 overflow-y-auto base-scrollbar', className)}>
      <div className="w-full flex items-center justify-center ">
        <h1 className="font-medium text-4xl">Cart</h1>
      </div>
      <div className="grid justify-center grid-cart-items-template gap-2 mt-6 px-4">
        {items.map((game: GameDto) => (
          <div key={game.id} className="relative">
            <Link href={`/games/${game.id}`}>
              <a>
                {game?.imageUrl && (
                  <div className="w-28 h-18">
                    <Image src={game.imageUrl} width={460} height={215} alt={`${game.name}`} />
                  </div>
                )}
                <div className="absolute bg-green-500 w-8 h-8 rounded-full flex items-center justify-center z-30 top-8 left-22">
                  <div>{game.quantity}</div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center gap-4 mt-10">
        {isCartPage ? (
          <>
            <span className="font-medium text-xl text-center">Order Total Price: {CART.getTotalPrice()}UAN</span>
            <button className={cartButtonClasses} onClick={() => setIsPurchaseModalVisible(true)}>
              <CartIcon size={24} />
              <span className="font-medium">Make an order</span>
            </button>
            <Portal>
              <UserDataModal
                setIsPurchaseDone={setIsPurchaseDone}
                isModalVisible={isPurchaseModalVisible}
                setIsModalVisible={setIsPurchaseModalVisible}
              />
            </Portal>
          </>
        ) : (
          <Link href="/cart">
            <a className={cartButtonClasses}>
              <CartIcon size={24} />
              <span className="font-medium">View Cart</span>
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CartItems;
