import { setupProducts } from "./products";
import { setupCounter } from "./counter";
import { setupCart } from "./cart";

async function main() {
  const { updateCount: updateProductCount, getProductById } =
    await setupProducts({
      container: document.querySelector("#products"),
      onDecreaseClick,
      onIncreaseClick,
    });

  const {
    addProduct: addProductToCart,
    removeProduct: removeProductFromCart,
    updateCount: updateCartCount,
  } = setupCart({
    container: document.querySelector(".cart_items"),
    onDecreaseClick,
    onIncreaseClick,
  });

  const { increase, decrease, getTotalCount } = setupCounter();

  const updateTotalCount = (totalCount) => {
    document.querySelector(".total_count").innerHTML = `(${totalCount})`;
  };

  function onIncreaseClick({ productId }) {
    const count = increase({ productId });
    updateProductCount({ productId, count });
    if (count === 1) {
      addProductToCart({ product: getProductById({ productId }) });
    }
    updateCartCount({ productId, count });
    updateTotalCount(getTotalCount());
  }

  function onDecreaseClick({ productId }) {
    const count = decrease({ productId });
    updateProductCount({ productId, count });
    updateCartCount({ productId, count });
    if (count === 0) {
      removeProductFromCart({ product: getProductById({ productId }) });
    }
    updateTotalCount(getTotalCount());
  }

  document.querySelector(".btn-cart").addEventListener("click", () => {
    document.body.classList.add("displaying_cart");
  });

  document.querySelector(".btn-close-cart").addEventListener("click", () => {
    document.body.classList.remove("displaying_cart");
  });

  document.querySelector(".cart-dimmed-bg").addEventListener("click", () => {
    document.body.classList.remove("displaying_cart");
  });
}

main();
