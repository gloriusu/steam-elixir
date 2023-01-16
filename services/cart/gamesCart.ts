import { GameDto, GamesListDto } from '../../types/games.types';

const CART = {
  KEY: 'CART_ITEMS',
  items: [] as GamesListDto,
  init() {
    const contents = localStorage.getItem(CART.KEY);
    if (contents) {
      CART.items = JSON.parse(contents);
    } else {
      CART.empty();
    }
  },
  async sync() {
    const cart = JSON.stringify(CART.items);
    await localStorage.setItem(CART.KEY, cart);
  },
  findItem(id: number) {
    const match = CART.items.filter((item: GameDto) => {
      if (item.id == id) return true;
    });
    if (match && match[0]) return match[0];
  },
  addItem(game: GameDto) {
    if (CART.findItem(game.id)) {
      CART.increaseItemQuantity(game.id, 1);
    } else {
      CART.items.push(game);
      CART.sync();
    }
  },
  increaseItemQuantity(id: number, quantity = 1) {
    CART.items = CART.items.map((item: GameDto) => {
      if (item.id === id) item.quantity = item.quantity + quantity;
      return item;
    });

    CART.sync();
  },

  decreaseItemQuantity(id: number, quantity = 1) {
    CART.items = CART.items.map((item: GameDto) => {
      if (item.id === id) item.quantity = item.quantity - quantity;
      return item;
    });
    CART.items.forEach(async (item: GameDto) => {
      if (item.id === id && item.quantity === 0) await CART.remove(id);
    });

    CART.sync();
  },
  remove(id: number) {
    CART.items = CART.items.filter((item: GameDto) => {
      if (item.id !== id) return true;
    });

    CART.sync();
  },
  getTotalPrice() {
    return CART.items.reduce((total: number, current: GameDto) => total + current.price * current.quantity, 0);
  },
  empty() {
    CART.items = [];

    CART.sync();
  },
};

export default CART;
