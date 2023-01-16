import React, { useEffect, useState } from 'react';
import UiCard from '../../components/UI/UiCard/UiCard';
import UiDivider from '../../components/UI/UiDivider/UiDivider';
import { useRouter } from 'next/router';
import BackIcon from '../../components/Icons/BackIcon';
import Head from 'next/head';
import { useQuery } from 'react-query';
import UiLoader from '../../components/UI/UiLoader/UiLoader';
import clsx from 'clsx';
import CART from '../../services/cart/gamesCart';
import CartItems from '../../components/CartItems/CartItems';
import Image from 'next/image';
import AddToCartIcon from '../../components/Icons/AddToCartIcon';
import { GameDto, GamesListDto } from '../../types/games.types';
import { ApiGames } from '../../services/api/ApiGames';

const ProductItem = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: game, isLoading } = useQuery<GameDto>([`game ${id}`], () => ApiGames.getGameById(Number(id)));

  const [cartItems, setCartItems] = useState<GamesListDto>(CART.items);
  const [isAddToCartClicked, setIsAddToCartClicked] = useState(false);
  const isCartHasItems = cartItems.length > 0;

  const handleAddToCart = (newGame: GameDto) => {
    CART.addItem(newGame);
    setCartItems(CART.items);
    setIsAddToCartClicked(true);
  };

  useEffect(() => {
    setCartItems(CART.items);
    setIsAddToCartClicked(false);
  }, [cartItems, CART.items, isAddToCartClicked]);

  if (isLoading) {
    return <UiLoader size="large" />;
  }

  return (
    <>
      {game ? (
        <>
          <Head>
            <title>{`${game.name}`}</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className={clsx('flex w-full', isCartHasItems ? 'h-sc' : 'pr-12')}>
            <div className={clsx('flex flex-col', isCartHasItems ? 'w-3/4' : 'w-full')}>
              <button className="flex items-center mb-4" onClick={() => router.back()}>
                <BackIcon size={24} />
                <span className="font-medium text-xl"> Back</span>
              </button>
              <UiCard
                className={clsx('flex flex-col gap-2 w-full mb-12', isCartHasItems && 'overflow-auto base-scrollbar')}
              >
                <div className="flex gap-12">
                  <div className="w-1/4">
                    {game?.imageUrl && (
                      <div>
                        <Image src={game.imageUrl} width={460} height={215} alt={`${game.name}`} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col w-3/4 mt-4 gap-3">
                    <div className="flex w-full justify-between items-center">
                      <h1 className="font-bold text-5xl">{game.name}</h1>
                      <button
                        className="flex items-center justify-center gap-1 bg-black text-white rounded-xl px-3 py-2 hover:bg-gray-800"
                        onClick={() => handleAddToCart(game)}
                      >
                        <AddToCartIcon size={24} />
                        Add to Cart
                      </button>
                    </div>
                    {game?.genres?.length > 0 && (
                      <div className="flex gap-2">
                        <span>Genres:</span>
                        <span className="text-gray-400">
                          {game.genres.length > 0 && game.genres.map((genre) => genre.genreName).join(', ')}
                        </span>
                      </div>
                    )}
                    <span className="font-medium text-2xl">Price: {game.price}UAN</span>
                  </div>
                </div>
                <UiDivider className="my-4" />
                <div className="flex flex-col gap-2">
                  <h3 className="font-medium text-2xl">Description</h3>
                  <p>{game.description}</p>
                </div>
              </UiCard>
            </div>
            {isCartHasItems && <CartItems items={cartItems} />}
          </div>
        </>
      ) : (
        <div className="h-fw w-full flex items-center justify-center">
          <span className="font-medium text-3xl">Something went wrong!</span>
        </div>
      )}
    </>
  );
};

export default ProductItem;
