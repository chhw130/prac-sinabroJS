const BASE_URL = 'https://learnwitheunjae.dev/api/sinabro-js/ecommerce';

const getProducts = async () => {
  const response = await fetch(BASE_URL);

  return response.json();
};

async function main() {
  const products = await getProducts();

  const $products = document.querySelector('#products');

  const produtcsTemplate = products
    .map(
      ({ name, images, regularPrice }) => `
    <div class='product'>
      <img src='${images[0]}' alt='img-product'/>
      <p>${name}</p>
      <div class='flex items-center justify-between'>
        <span>Price : ${regularPrice}</span>
        <div>
          <button class='bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full'>+</button>
          <span class='hidden'>3</span>
          <button class='bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full'>- </button>
        </div>
      </div>
    </div>`
    )
    .join('');

  $products.innerHTML = produtcsTemplate;
}

main();
