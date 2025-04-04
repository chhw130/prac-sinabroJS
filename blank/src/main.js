const BASE_URL = 'https://learnwitheunjae.dev/api/sinabro-js/ecommerce';

const getProducts = async () => {
  const response = await fetch(BASE_URL);

  return response.json();
};

const findElement = (startElement, selector) => {
  let currentElement = startElement;

  while (currentElement) {
    if (currentElement.matches(selector)) {
      return currentElement;
    }

    currentElement = currentElement.parentElement;
  }
  return null;
};

const getProductTemplate = ({ id, images, name, regularPrice }, count = 0) => {
  return `<div class='product' data-product-id='${id}'>
  <img src='${images[0]}' alt='img-product'/>
  <p>${name}</p>
  <div class='flex items-center justify-between'>
    <span>Price : ${regularPrice}</span>
    <div>
      <button ${
        !!count && 'disabled'
      } class='btn-decrease bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full disabled:cursor-not-allowed disabled:opacity-80'>-</button>
      <span class='cart-count'>${count}</span>
      <button  class='btn-increase bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full '>+</button>
    </div>
  </div>
</div>`;
};

async function main() {
  const products = await getProducts();
  const productMap = {};
  products.forEach((product) => {
    productMap[product.id] = product;
  });

  const productCntMap = {};

  const $products = document.querySelector('#products');

  const produtcsTemplate = products.map((product) => getProductTemplate(product)).join('');

  $products.innerHTML = produtcsTemplate;

  const updateProductCount = (id) => {
    const $productCardElement = document.querySelector(`.product[data-product-id='${id}']`);
    const $cartCount = $productCardElement.querySelector('.cart-count');
    $cartCount.innerHTML = productCntMap[id];

    if (!productCntMap[id]) {
      cartCountElement.innerHTML = '';
    }
  };

  const updateCart = () => {
    // cart item 그려주기
    const productIds = Object.keys(productCntMap);
    const cartProductsTemplate = productIds
      .map((id) => {
        const product = productMap[id];
        return getProductTemplate(product, productCntMap[id]);
      })
      .join('');
    document.querySelector('.cart_items').innerHTML = cartProductsTemplate;

    // cart 갯수 갱신 및 view그리기
    const $totalCount = document.querySelector('.total_count');
    const totalCount = Object.values(productCntMap).reduce((acc, cur) => acc + cur, 0);
    $totalCount.innerHTML = `Cart(${totalCount})`;
  };

  const increaseProduct = (id) => {
    if (!productCntMap[id]) {
      productCntMap[id] = 0;
    }
    productCntMap[id] += 1;

    updateProductCount(id);
    updateCart();
  };

  const decreaseProduct = (id) => {
    if (!productCntMap[id]) {
      productCntMap[id] = 0;
    }
    productCntMap[id] -= 1;

    updateProductCount(id);
    updateCart();
  };

  document.querySelector('#products').addEventListener('click', (e) => {
    const $targetElement = e.target;
    const $productCardElement = findElement($targetElement, '.product');

    const productId = $productCardElement.getAttribute('data-product-id');

    if ($targetElement.matches('.btn-decrease')) {
      decreaseProduct(productId);
    }
    if ($targetElement.matches('.btn-increase')) {
      increaseProduct(productId);
    }
  });

  document.querySelector('.btn-cart').addEventListener('click', () => {
    const $cart = document.querySelector('.cart-layer');
    $cart.style.display = 'block';
    //like
    // $cart.classList.remove('hidden')
  });

  document.querySelector('.btn-close-cart').addEventListener('click', () => {
    const $cart = document.querySelector('.cart-layer');
    $cart.style.display = 'none';
  });

  document.querySelector('.cart-dimmed-bg').addEventListener('click', () => {
    const $cart = document.querySelector('.cart-layer');
    $cart.style.display = 'none';
  });
}

main();
