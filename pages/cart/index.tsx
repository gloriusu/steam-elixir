import React, { useEffect, useState } from 'react';
import CartItems from '../../components/CartItems/CartItems';
import CART from '../../services/cart/gamesCart';
import clsx from 'clsx';
import UiCard from '../../components/UI/UiCard/UiCard';
import MinusIcon from '../../components/Icons/MinusIcon';
import PlusIcon from '../../components/Icons/PlusIcon';
import Head from 'next/head';
import Link from 'next/link';
import EmptyCartIcon from '../../components/Icons/EmptyCartIcon';
import { BsCartCheck } from 'react-icons/bs';
import Image from 'next/image';
import { GiGamepad } from 'react-icons/gi';
import { GameDto, GamesListDto } from '../../types/games.types';

const Cart = () => {
  const [cartItems, setCartItems] = useState<GamesListDto>([]);
  const [isAddItemClicked, setIsAddItemClicked] = useState(false);
  const [isRemoveItemClicked, setIsRemoveItemClicked] = useState(false);
  const [isPurchaseDone, setIsPurchaseDone] = useState(false);

  const isCartHasItems = CART.items.length > 0;

  const handleAddItemToCart = (game: GameDto) => {
    CART.addItem(game);
    setCartItems(CART.items);
    setIsAddItemClicked(true);
  };

  const handleRemoveItemFromCart = (game: GameDto) => {
    CART.decreaseItemQuantity(game.id);
    setCartItems(CART.items);
    setIsAddItemClicked(true);
  };

  useEffect(() => {
    setCartItems(CART.items);
    setIsAddItemClicked(false);
    setIsRemoveItemClicked(false);
  }, [cartItems, isAddItemClicked, isRemoveItemClicked, isPurchaseDone]);

  return (
    <>
      <Head>
        <title>Cart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={clsx('flex w-full h-sc')}>
        {isCartHasItems ? (
          <>
            <div className={clsx('flex flex-col h-full flex-grow mb-12', isCartHasItems ? 'w-3/4' : 'w-full')}>
              <h1 className="font-medium text-4xl">Check your Cart items</h1>
              <div
                className={clsx(
                  'flex flex-col h-full gap-4 w-full my-6',
                  isCartHasItems && 'overflow-auto base-scrollbar'
                )}
              >
                {cartItems.map((game: GameDto) => (
                  <UiCard key={game.id} className="flex w-full">
                    <div className="flex items-center h-64 w-1/4">
                      <Link href={`/games/${game.id}`}>
                        <a>
                          {game?.imageUrl && (
                            <div>
                              <Image src={game.imageUrl} width={460} height={215} alt={`${game.name}`} />
                            </div>
                          )}
                        </a>
                      </Link>
                    </div>

                    <div className="flex flex-col justify-between w-3/4 h-full pl-6">
                      <div className="flex flex-col gap-3 text-xl">
                        <h3 className="font-normal text-3xl">{game.name}</h3>
                        {game?.genres?.length > 0 && (
                          <div className="flex gap-2">
                            <span>Genres:</span>
                            <span className="text-gray-400">
                              {game.genres.length > 0 && game.genres.map((genre) => genre.genreName).join(', ')}
                            </span>
                          </div>
                        )}
                        <p className="font-normal text-sm">{game.description}</p>
                      </div>
                      <div className="flex items-center justify-between text-xl mb-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{game.price}UAN</span>
                          <span className="text-base">x</span>
                          <span>{game.quantity}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => handleRemoveItemFromCart(game)}>
                            <MinusIcon size={32} className="text-red-500" />
                          </button>
                          <span>{game.quantity}</span>
                          <button onClick={() => handleAddItemToCart(game)}>
                            <PlusIcon size={32} className="text-green-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </UiCard>
                ))}
              </div>
            </div>
            <CartItems items={cartItems} setIsPurchaseDone={setIsPurchaseDone} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <UiCard className="flex flex-col items-center gap-6 p-12 mb-26">
              {isPurchaseDone ? <BsCartCheck size={100} /> : <EmptyCartIcon size={100} />}
              <p className="text-2xl font-medium">
                {isPurchaseDone
                  ? 'Order was generated! Manager will contact you shortly.'
                  : 'Your cart is empty. Go to the Games page!'}
              </p>
              <Link href="/games">
                <a className="flex items-center justify-center gap-1 bg-black text-white rounded-xl px-3 py-2 hover:bg-gray-800">
                  <GiGamepad size={24} />
                  <span className="font-medium">Games</span>
                </a>
              </Link>
            </UiCard>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
