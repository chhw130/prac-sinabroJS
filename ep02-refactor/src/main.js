import test from "./test.json?raw";

async function getProducts() {
  if (process.env.NODE_ENV === "development") {
    return JSON.parse(test);
  } else {
    const response = await fetch(
      "https://learnwitheunjae.dev/api/sinabro-js/ecommerce"
    );
    return await response.json();
  }
}

function findElement(startingElement, selector) {
  let currentElement = startingElement;
  while (currentElement) {
    if (currentElement.matches(selector)) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }
  return null;
}

function sumAllCounts(countMap) {
  let sum = 0;
  Object.values(countMap).forEach((number) => {
    sum += number;
  });
  return sum;

  // return Object.values(countMap).reduce((total, current) => {
  //   total += current;
  //   return total;
  // }, 0);
}

function getProductHTML(product, count = 0) {
  return `
  <div class="product" data-product-id="${product.id}">
    <img src="${product.images[0]}" alt="Image of ${product.name}" />
    <p>${product.name}</p>
    <div class="flex items-center justify-between">
      <span>Price: ${product.regularPrice}</span>
      <div>
        <button type="button" class="btn-decrease disabled:cursor-not-allowed disabled:opacity-50 bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">-</button>
        <span class="cart-count text-green-800">${
          count === 0 ? "" : count
        }</span>
        <button type="button" class="btn-increase bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">+</button>
      </div>
    </div>
  </div>
`;
}

async function main() {
  const products = await getProducts();
  const productMap = {};
  products.forEach((product) => {
    productMap[product.id] = product;
  });
  const countMap = {};

  const updateProductCount = (productId) => {
    const productElement = document.querySelector(
      `.product[data-product-id='${productId}']`
    );
    const cartCountElement = productElement.querySelector(".cart-count");
    cartCountElement.innerHTML = countMap[productId];
    if (countMap[productId] === 0) {
      cartCountElement.innerHTML = "";
    }
  };

  const updateCart = () => {
    const productIds = Object.keys(countMap);
    document.querySelector(".cart_items").innerHTML = productIds
      .map((productId) => {
        const productInCart = productMap[productId];
        if (countMap[productId] === 0) {
          return "";
        }
        return getProductHTML(productInCart, countMap[productId]);
      })
      .join("");

    document.querySelector(".total_count").innerHTML = `(${sumAllCounts(
      countMap
    )})`;
  };

  const increaseCount = (productId) => {
    if (countMap[productId] === undefined) {
      countMap[productId] = 0;
    }
    countMap[productId] += 1;
    updateProductCount(productId);
    updateCart();
  };

  const decreaseCount = (productId) => {
    if (countMap[productId] === undefined) {
      countMap[productId] = 0;
    }
    countMap[productId] -= 1;
    updateProductCount(productId);
    updateCart();
  };

  document.querySelector("#products").innerHTML = products
    .map((product) => getProductHTML(product))
    .join("");

  document.querySelector("#products").addEventListener("click", (event) => {
    const targetElement = event.target;
    const productElement = findElement(targetElement, ".product");
    const productId = productElement.getAttribute("data-product-id");

    if (
      targetElement.matches(".btn-decrease") ||
      targetElement.matches(".btn-increase")
    ) {
      if (targetElement.matches(".btn-decrease")) {
        decreaseCount(productId);
      } else if (targetElement.matches(".btn-increase")) {
        increaseCount(productId);
      }
    }
  });

  document.querySelector(".cart_items").addEventListener("click", (event) => {
    const targetElement = event.target;
    const productElement = findElement(targetElement, ".product");
    const productId = productElement.getAttribute("data-product-id");

    if (
      targetElement.matches(".btn-decrease") ||
      targetElement.matches(".btn-increase")
    ) {
      if (targetElement.matches(".btn-decrease")) {
        decreaseCount(productId);
      } else if (targetElement.matches(".btn-increase")) {
        increaseCount(productId);
      }
    }
  });

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
