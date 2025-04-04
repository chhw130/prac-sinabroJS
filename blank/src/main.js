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

async function main() {
  const products = await getProducts();

  const $products = document.querySelector('#products');

  const produtcsTemplate = products
    .map(
      ({ name, images, regularPrice, id }) => `
    <div class='product' data-product-id='${id}'>
      <img src='${images[0]}' alt='img-product'/>
      <p>${name}</p>
      <div class='flex items-center justify-between'>
        <span>Price : ${regularPrice}</span>
        <div>
          <button class='btn-decrease bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full'>+</button>
          <span class='hidden'>3</span>
          <button class='btn-increase bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full'>- </button>
        </div>
      </div>
    </div>`
    )
    .join('');

  $products.innerHTML = produtcsTemplate;

  document.querySelector('#products').addEventListener('click', (e) => {
    const $targetElement = e.target;
    const $productCardElement = findElement($targetElement, '.product');

    const productId = $productCardElement.getAttribute('data-product-id');
    const currentProduct = products.find((ele) => ele.id === productId);

    if ($targetElement.matches('.btn-decrease')) {
      console.log('decrease');
    }
    if ($targetElement.matches('.btn-increase')) {
      console.log('increase');
    }
  });
}

main();
