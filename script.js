//Temel Değişkenler
const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const categoryList = document.getElementById("categoryList");
const API_URL = "https://dummyjson.com/products";
var products = []; // ürünleri bu diziye eklicez
//API'lardan ürünün çekilmesi

function fetchProducts() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      // ürünleri tutan boş arrayi fetchden gelen dolu array ile dolduruyorum
      products = data.products;
      displayProducts(products);
      displayCategories();
    });
}

// fetchProducts();

//**********Ürünleri görüntülemek için fonksiyon*************
function displayProducts(products) {
  productList.innerHTML = "";

  products.forEach((product) => {
    //Her ürün için bir kart tasarımı
    const card = document.createElement("div");
    card.classList.add("col-md-4", "my-2"); // classlist ile oluşturursan yanına ekler classname ile oluşturursan silip üstüne yazar.
    card.innerHTML = `
        <div class="card">
            <img src=${product.thumbnail} class="card-img-top img-fluid" alt=${product.title}/>
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">${product.price} TL</p>
            </div>
        </div>
    `;

    //Kartı ürün listesine appendliycez
    productList.appendChild(card); // push sadece diziye eklemek için kullanılır appendchild html'e eklemek için
  });
}

// *********kategorileri görüntüleyeceğimiz fonksyion*******
function displayCategories() {
  const categories = [];
  products.map((product) => {
    // Eğer ki categories isimli dizimin içinde daha önce pushlamış olduğum herhangi bir ürün kategorisi varsa tekrardan eklemek istemiyorum. amacım bütün kategorileri tekli şekilde görüntülemek. bu yüzden aşağıdaki gibi bir koşul ekledim
    if (!categories.includes(product.category)) {
      //includes() metodu, belirtilen değerin dizi öğelerinde olup olmadığını test eder.
      categories.push(product.category);
    }
    categoryList.innerHTML = "";
    // yukarıda başlangıçta boş bir array olan sonrasında doldurduğum categories isimli arrayimi mapliyırum ya da foreachliiyorum.
    categories.forEach((category) => {
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item");
      listItem.textContent = category;

      // ilgili kategoriye tıklanınca o kategorideki ürünleri getirme.

      listItem.addEventListener("click", () => {
        const filteredProducts = products.filter(
          (product) => product.category === category
        );
        displayProducts(filteredProducts);
      });

      categoryList.appendChild(listItem);
    });
  });
}

// search section

searchButton.addEventListener("click", searchProducts);

function searchProducts() {
  const searchItem = searchInput.value.toLowerCase().trim();

  const filteredProducts = products.filter(
    (x) =>
      x.title.toLowerCase().includes(searchItem) ||
      x.description.includes(searchItem) === searchItem
  );

  displayProducts(filteredProducts);
}

fetchProducts();
