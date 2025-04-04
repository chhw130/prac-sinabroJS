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

const getProductTemplate = ({ id, images, name, regularPrice }) => {
  return `<div class='product' data-product-id='${id}'>
  <img src='${images[0]}' alt='img-product'/>
  <p>${name}</p>
  <div class='flex items-center justify-between'>
    <span>Price : ${regularPrice}</span>
    <div>
      <button disabled  class='btn-decrease  bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full disabled:cursor-not-allowed disabled:opacity-80'>-</button>
      <span class='cart-count'>0</span>
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

  document.querySelector('#products').addEventListener('click', (e) => {
    const $targetElement = e.target;
    const $productCardElement = findElement($targetElement, '.product');

    const productId = $productCardElement.getAttribute('data-product-id');

    if (!productCntMap[productId]) {
      productCntMap[productId] = 0;
    } else {
      const productIds = Object.keys(productCntMap);
      const cartProductsTemplate = productIds
        .map((id) => {
          const product = productMap[id];
          return getProductTemplate(product);
        })
        .join('');
      document.querySelector('.cart_items').innerHTML = cartProductsTemplate;
    }

    if ($targetElement.matches('.btn-decrease')) {
      productCntMap[productId] -= 1;
    }
    if ($targetElement.matches('.btn-increase')) {
      productCntMap[productId] += 1;
    }

    const $cartCount = $productCardElement.querySelector('.cart-count');
    $cartCount.innerHTML = productCntMap[productId];

    const $totalCount = document.querySelector('.total_count');

    const totalCount = Object.values(productCntMap).reduce((acc, cur) => acc + cur, 0);

    $totalCount.innerHTML = `Cart(${totalCount})`;
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
