const counter = document.querySelector(".cartIconWrap span");
const total = document.querySelector(".basketTotal");
const totalValue = document.querySelector(".basketTotalValue");
const basketEl = document.querySelector(".basket");

document.querySelector(".cartIconWrap").addEventListener("click", () => {
  basketEl.classList.toggle("hidden");
});

document.querySelector(".featuredItems").addEventListener("click", (e) => {
  if (e.target.closest(".addToCart")) {
    const featuredItemEl = e.target.closest(".featuredItem");
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = +featuredItemEl.dataset.price;

    addToCart(id, name, price);
  }
});

const basket = {};
const addToCart = (id, name, price) => {
  if (!(id in basket)) {
    basket[id] = { id: id, name: name, price: price, count: 0 };
  }

  basket[id].count++;

  counter.textContent = getTotalBasketCount().toString();

  totalValue.textContent = getTotalBasketPrice().toFixed(2);

  renderProductInBasket(id);
};

const getTotalBasketCount = () =>
  Object.values(basket).reduce((acc, product) => acc + product.count, 0);

const getTotalBasketPrice = () =>
  Object.values(basket).reduce((acc, product) => acc + product.price * product.count, 0);

const renderProductInBasket = (productId) => {
  const basketRowEl = basketEl.querySelector(`.basketRow[data-id="${productId}"]`);
  if (!basketRowEl) {
    renderNewProductInBasket(productId);
    return;
  }

  const product = basket[productId];

  basketRowEl.querySelector(".productCount").textContent = product.count;
  basketRowEl.querySelector(".productTotalRow").textContent = (
    product.price * product.count
  ).toFixed(2);
};

const renderNewProductInBasket = (productId) => {
  const productRow = `
    <div class="basketRow" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(
          basket[productId].price * basket[productId].count
        ).toFixed(2)}</span>
      </div>
    </div>
    `;
  totalValue.insertAdjacentHTML("beforebegin", productRow);
};
