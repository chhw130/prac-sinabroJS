import { setupCart } from './cart';
import { setupCounter } from './counter';
import { setupProducts } from './products';

const updateTotalCount = (totalCount) => {
  document.querySelector('.total_count').innerHTML = `(${totalCount})`;
};

async function main() {
  const { updateCount: updateProductCount, getProductById } = await setupProducts({
    container: document.querySelector('#products'),
    onIncreaseClick: increaseCount,
    onDecreaseClick: decreaseCount,
  });

  const {
    addProduct,
    removeProduct,
    updateCount: updateCartCount,
  } = setupCart({
    container: document.querySelector('.cart_items'),
    onIncreaseClick: increaseCount,
    onDecreaseClick: decreaseCount,
  });

  const { increase, decrease, getTotalCount } = setupCounter();

  function increaseCount(productId) {
    const count = increase(productId);
    updateProductCount({ productId, count });
    const product = getProductById(productId);
    if (count === 1) {
      addProduct(product);
    }
    updateTotalCount(getTotalCount());
    updateCartCount({ productId, count });
  }

  function decreaseCount(productId) {
    const count = decrease(productId);
    updateProductCount({ productId, count });
    const product = getProductById(productId);
    updateTotalCount(getTotalCount());
    updateCartCount({ productId, count });
    if (count === 0) {
      removeProduct(product);
    }
  }

  document.querySelector('.btn-cart').addEventListener('click', () => {
    document.body.classList.add('displaying_cart');
  });

  document.querySelector('.btn-close-cart').addEventListener('click', () => {
    document.body.classList.remove('displaying_cart');
  });

  document.querySelector('.cart-dimmed-bg').addEventListener('click', () => {
    document.body.classList.remove('displaying_cart');
  });
}

main();
