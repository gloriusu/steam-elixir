import React, { useEffect, useState } from 'react';
import UiCard from '../../components/UI/UiCard/UiCard';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import AddToCartIcon from '../../components/Icons/AddToCartIcon';
import UiLoader from '../../components/UI/UiLoader/UiLoader';
import CART from '../../services/cart/gamesCart';
import CartItems from '../../components/CartItems/CartItems';
import { BiSearch } from 'react-icons/bi';
import clsx from 'clsx';
import { useQueryState } from 'use-location-state/next';
import { GameDto, GamesListDto } from '../../types/games.types';
import Pagination from '../../components/Pagination/Pagination';
import useGames from '../../hooks/useGames';

const Products = () => {
  const [page, setPage] = useQueryState<number>('page', 1);
  const { games, isLoading, refetch } = useGames(page);
  const [cartItems, setCartItems] = useState<GamesListDto>([]);
  const [isAddToCartClicked, setIsAddToCartClicked] = useState(false);
  const [searchText, setSearchText] = useState('');
  const isCartHasItems = cartItems.length > 0;

  const filteredProducts = games?.filter((product) =>
    [product.name, product.description].join(' ').toLowerCase().includes(searchText.trim().toLowerCase())
  );

  const isFilteredProductsEmpty = filteredProducts?.length === 0;

  const handleAddToCart = (game: GameDto) => {
    CART.addItem(game);
    setCartItems(CART.items);
    setIsAddToCartClicked(true);
  };

  useEffect(() => {
    refetch();
    setSearchText('');
  }, [page]);

  useEffect(() => {
    setCartItems(CART.items);
    setIsAddToCartClicked(false);
  }, [cartItems, CART.items, isAddToCartClicked]);

  if (isLoading) {
    return <UiLoader size="large" />;
  }

  const isNoGames = games?.length === 0 && searchText.trim() === '' && !isLoading;

  return (
    <>
      <Head>
        <title>Games</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={clsx('flex w-full', isCartHasItems && 'h-sc')}>
        <div
          className={clsx('flex flex-col items-center gap-5 mb-12 h-full', isCartHasItems ? 'w-3/4' : 'w-full mr-10')}
        >
          <UiCard
            padding="p-0"
            className="flex items-center  gap-1 w-max-[400px] pl-4 focus-within:outline outline-1 mb-4"
          >
            <BiSearch size={24} />
            <input
              type="text"
              placeholder="Search..."
              className="h-full w-full rounded-md text-xl py-3 px-4 outline-none"
              onChange={(event) => setSearchText(event.target.value)}
              value={searchText}
            />
          </UiCard>

          <div
            className={clsx(
              'grid justify-center grid-products-template gap-4 mb-6 w-full',
              isCartHasItems && 'overflow-auto base-scrollbar'
            )}
          >
            {isNoGames && <span className="text-center font-medium text-3xl text-gray-400 mt-6">No data</span>}
            {filteredProducts && isFilteredProductsEmpty
              ? Boolean(searchText) && (
                  <UiCard className="flex flex-col items-center gap-6 justify-center mt-36">
                    <h3 className="font-medium text-3xl">Oops...</h3>
                    <span className="text-2xl">No games found!</span>
                  </UiCard>
                )
              : filteredProducts?.map((game: GameDto) => (
                  <UiCard key={game.id} className="flex flex-col gap-2 justify-between">
                    <Link href={`/games/${game.id}`}>
                      <a className="flex flex-col gap-2">
                        {game?.imageUrl && (
                          <div>
                            <Image src={game.imageUrl} width={460} height={215} alt={`${game.name}`} />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-lg">{game.name}</div>
                          {game?.genres?.length > 0 && (
                            <div className="flex gap-2">
                              <span>Genres:</span>
                              <span className="text-gray-400">
                                {game.genres.length > 0 && game.genres.map((genre) => genre.genreName).join(', ')}
                              </span>
                            </div>
                          )}
                        </div>
                      </a>
                    </Link>

                    <div className="flex justify-between items-center">
                      <div className="font-medium text-lg">Price: {game.price}UAN</div>
                      <button
                        className="bg-black rounded-lg p-1.5 hover:bg-gray-800"
                        onClick={() => handleAddToCart(game)}
                      >
                        <AddToCartIcon size={24} className="text-white" />
                      </button>
                    </div>
                  </UiCard>
                ))}
          </div>
          <Pagination page={page} itemsAmount={games.length} setPage={setPage} />
        </div>
        {isCartHasItems && <CartItems items={cartItems} className="duration-75" />}
      </div>
    </>
  );
};

export default Products;
