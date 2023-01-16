import React from 'react';

type PaginationProps = {
  page: number;
  itemsAmount: number;
  setPage: (page: number) => void;
};

const Pagination = ({ page, itemsAmount, setPage }: PaginationProps) => {
  const handlePrevClick = () => {
    setPage(page - 1);
  };

  const handleNextClick = () => {
    setPage(page + 1);
  };

  const isNextButtonDisabled = itemsAmount !== 10;
  const isPrevButtonDisabled = page === 1;

  const activeClass =
    'border-indigo-900 text-black hover:bg-gray-100 bg-white rounded md:inline-flex relative items-center px-4 py-2 border text-xl font-medium';
  const inactiveClass =
    'border-gray-500 text-black cursor-default bg-gray-400 rounded md:inline-flex relative items-center px-4 py-2 border text-xl font-medium';

  return (
    <div className="flex justify-center my-6 gap-1">
      <button
        type="button"
        onClick={handlePrevClick}
        className={isPrevButtonDisabled ? inactiveClass : activeClass}
        disabled={isPrevButtonDisabled}
      >
        {'<'}
      </button>
      <button
        type="button"
        onClick={handleNextClick}
        className={isNextButtonDisabled ? inactiveClass : activeClass}
        disabled={isNextButtonDisabled}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
