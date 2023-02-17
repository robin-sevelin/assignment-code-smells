/*
1. Se om du kan hitta problem med koden nedan och se om du kan göra den bättre.
*/
export enum Sort {
  PRICE_ASCENDING = 'Stigande pris',
  PRICE_DECENDING = 'Sjunkande pris',
  NAME_ALPHABETIC = 'Alfabetisk ordning',
  NAME_ALPHABETIC_REVERSE = 'Omvänd alfabetisk ordning',
}

export class Product {
  constructor(
    public id: number,
    public name: string,
    public imageUrl: string[],
    public price: number,
    public description: string
  ) {}
}

export function sortProductsBy(sort: Sort, products: Product[]): Product[] {
  let copiedList: Product[] = [];
  products.forEach((product) => copiedList.push(product));

  if (sort === Sort.PRICE_ASCENDING) return sortPriceAscending(copiedList);
  if (sort === Sort.PRICE_DECENDING) return sortPriceDescending(copiedList);
  if (sort === Sort.NAME_ALPHABETIC) return sortNameDescending(copiedList);
  if (sort === Sort.NAME_ALPHABETIC_REVERSE)
    return sortNameAscending(copiedList);

  return copiedList;
}

function sortPriceAscending(products: Product[]) {
  return products.sort((a, b) => a.price - b.price);
}

function sortPriceDescending(products: Product[]) {
  return products.sort((a, b) => b.price - a.price);
}

function sortNameAscending(products: Product[]) {
  return products.sort((a, b) => a.name.localeCompare(b.name));
}

function sortNameDescending(products: Product[]) {
  return products.sort((a, b) => b.name.localeCompare(a.name));
}

/*
  2. Refaktorera funktionen createProductHtml :)
  */
class Cart {
  addToCart(i: number) {}
}
export let cartList = JSON.parse(localStorage.getItem('savedCartList') || '[]');
export let productList = JSON.parse(localStorage.getItem('savedList') || '[]');

export function createProductHtml() {
  updateCartQuantity();

  for (let i = 0; i < productList.length; i++) {
    let {
      dogproduct,
      dogImg,
      cartSymbol,
    }: {
      dogproduct: HTMLDivElement;
      dogImg: HTMLImageElement;
      cartSymbol: HTMLElement;
    } = renderDogProduct(i);

    renderProductElements(i, dogproduct);

    addProductToLocalStorage(i, dogImg, cartSymbol);

    productByCategory(i, dogproduct);
  }
  let listastext = JSON.stringify(productList);
  localStorage.setItem('savedList', listastext);
  sessionStorage.clear();
}

function renderDogProduct(i: number) {
  let dogproduct: HTMLDivElement = document.createElement('div');
  let dogImgContainer: HTMLDivElement = document.createElement('div');
  dogImgContainer.className = 'dogimgcontainer';
  dogproduct.appendChild(dogImgContainer);
  let dogImg: HTMLImageElement = document.createElement('img');

  dogImg.src = productList[i].picture;
  dogImg.alt = productList[i].pictureAlt;

  dogImg.addEventListener('mouseover', () => {
    cartSymbolContainer.classList.add('hover');
    dogImg.classList.add('hover');
  });

  dogImg.addEventListener('mouseout', () => {
    dogImg.classList.remove('hover');
    cartSymbolContainer.classList.remove('hover');
  });

  dogImgContainer.appendChild(dogImg);
  let cartSymbolContainer: HTMLDivElement = document.createElement('div');
  cartSymbolContainer.className = 'cartSymbolContainer';
  dogImgContainer.appendChild(cartSymbolContainer);

  let cartSymbol: HTMLElement = document.createElement('i');
  cartSymbol.className = 'bi bi-bag-plus';
  cartSymbolContainer.appendChild(cartSymbol);
  return { dogproduct, dogImg, cartSymbol };
}

function renderProductElements(i: number, dogproduct: HTMLDivElement) {
  let name: HTMLHeadingElement = document.createElement('h5');
  name.innerHTML = productList[i].name;
  dogproduct.appendChild(name);

  let price: HTMLHeadingElement = document.createElement('p');
  price.innerHTML = '$' + productList[i].price;
  dogproduct.appendChild(price);

  let info: HTMLHeadingElement = document.createElement('p');
  info.innerHTML = productList[i].info;
  dogproduct.appendChild(info);
}

function addProductToLocalStorage(
  i: number,
  dogImg: HTMLImageElement,
  cartSymbol: HTMLElement
) {
  productList[i].productSpec = false;

  dogImg.addEventListener('click', () => {
    productList[i].productSpec = !productList[i].productSpec;
    window.location.href = 'product-spec.html#backArrow';
    let listastext = JSON.stringify(productList);
    localStorage.setItem('savedList', listastext);
  });

  cartSymbol.addEventListener('click', () => {
    let cart = new Cart();
    cart.addToCart(i);
  });
}

function updateCartQuantity() {
  let quantity = cartList.reduce(
    (previousItem: number, currentItem: number) => previousItem + currentItem
  );

  let floatingCart = document.getElementById(
    'floatingcartnumber'
  ) as HTMLElement;
  floatingCart.innerHTML = '' + quantity;
}

function productByCategory(i: number, dogproduct: HTMLDivElement) {
  if (productList[i].category === 'sassy') {
    let cat1: HTMLElement = document.getElementById('sassy') as HTMLElement;
    dogproduct.className = 'dogproduct';
    cat1.appendChild(dogproduct);
  }
  if (productList[i].category === 'kriminella') {
    let cat2: HTMLElement = document.getElementById(
      'kriminella'
    ) as HTMLElement;
    dogproduct.className = 'dogproduct';
    cat2.appendChild(dogproduct);
  }
  if (productList[i].category == 'singlar') {
    let cat3: HTMLElement = document.getElementById('singlar') as HTMLElement;
    dogproduct.className = 'dogproduct';
    cat3.appendChild(dogproduct);
  }
  if (productList[i].category === 'puppy') {
    let cat4: HTMLElement = document.getElementById('puppy') as HTMLElement;
    dogproduct.className = 'dogproduct';
    cat4.appendChild(dogproduct);
  }
  if (productList[i].category === 'oldies') {
    let cat5: HTMLElement = document.getElementById('oldies') as HTMLElement;
    dogproduct.className = 'dogproduct';
    cat5.appendChild(dogproduct);
  }
}

/*
  3. Refaktorera funktionen getfromstorage
  */
export class CartProduct {
  constructor(
    public name: string,
    public image: string,
    public price: number,
    public amount: number
  ) {}
}
let fromstorage: string = localStorage.getItem('cartArray') || '';
let products: CartProduct[] = JSON.parse(fromstorage);

function createHtml() {
  let { titleContainer, amountContainer, productQuantity, checkOutTotal } =
    renderProduct();

  for (let i: number = 0; i < products.length; i++) {
    renderProductAmount(titleContainer, i, amountContainer);

    let amount: HTMLTableCellElement = document.createElement('th');
    productQuantity.appendChild(amount);

    renderButtons(amount);
  }

  countTotalPrice(checkOutTotal);
}

function renderProductAmount(
  titlecontainer: HTMLTableRowElement,
  i: number,
  amountcontainer: HTMLDivElement
) {
  let productTable: HTMLTableCellElement = document.createElement('th');
  titlecontainer.appendChild(productTable);
  productTable.innerHTML = products[i].name;
  productTable.className = 'product-table';

  let amountTable: HTMLTableCellElement = document.createElement('th');
  amountcontainer.appendChild(amountTable);
  amountTable.innerHTML = 'x' + products[i].amount;
  amountTable.className = 'amount-table';
}

function renderButtons(amount: HTMLTableCellElement) {
  let plusButton: HTMLButtonElement = document.createElement('button');
  let minusButton: HTMLButtonElement = document.createElement('button');
  let iconPlus: HTMLSpanElement = document.createElement('i');
  let iconMinus: HTMLSpanElement = document.createElement('i');

  plusButton.className = 'plusbtn';
  minusButton.className = 'minusbtn';

  iconPlus.className = 'fas fa-plus';
  iconMinus.className = 'fas fa-minus';
  amount.className = 'amount';

  amount.appendChild(plusButton);
  amount.appendChild(minusButton);
  plusButton.appendChild(iconPlus);
  minusButton.appendChild(iconMinus);
}

function renderProduct() {
  let amountContainer = document.getElementById(
    'amount-checkout-container2'
  ) as HTMLDivElement;

  let amountText: HTMLTableCellElement = document.createElement('th');
  amountContainer.appendChild(amountText);
  amountText.innerHTML = 'amount:';

  let titleContainer = document.getElementById(
    'title-container'
  ) as HTMLTableRowElement;
  titleContainer.innerHTML = `<strong>products:</strong>`;

  let productQuantity = document.getElementById(
    'product-quantity'
  ) as HTMLTableRowElement;
  let quantity: HTMLTableCellElement = document.createElement('th');
  productQuantity.appendChild(quantity);
  quantity.innerHTML = 'change quantity:';

  let checkOutTotal = document.getElementById(
    'title-total'
  ) as HTMLTableCellElement;
  let totalText: HTMLTableCellElement = document.createElement('th');
  checkOutTotal.appendChild(totalText);
  totalText.innerHTML = 'total:';
  return { titleContainer, amountContainer, productQuantity, checkOutTotal };
}

function countTotalPrice(checkOutTotal: HTMLTableCellElement) {
  let totalSum = products.reduce((accumulate, current) => {
    return accumulate + current.price * current.amount;
  }, 0);

  let totalPrice: HTMLTableCellElement = document.createElement('th');
  checkOutTotal.appendChild(totalPrice);
  totalPrice.innerHTML = totalSum + '$';
  totalPrice.id = 'total-price';
}
