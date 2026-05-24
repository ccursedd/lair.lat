javascript
const SUPABASE_URL = "https://toakdkxwccvwjdzbsesl.supabase.co";
const SUPABASE_KEY = "sb_publishable_wue9qbGFMMANynMMQWdYAg_oyiNW-A-";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const loginBox = document.getElementById("loginBox");
const dashboard = document.getElementById("dashboard");
const loginMessage = document.getElementById("loginMessage");

async function login() {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    loginMessage.innerText = error.message;
    return;
  }

  showDashboard();
}

async function logout() {
  await supabaseClient.auth.signOut();
  dashboard.classList.add("hidden");
  loginBox.classList.remove("hidden");
}

async function checkUser() {

  const {
    data: { session }
  } = await supabaseClient.auth.getSession();

  if (session) {
    showDashboard();
  }
}

function showDashboard() {
  loginBox.classList.add("hidden");
  dashboard.classList.remove("hidden");

  renderAdminProducts();
  renderCategories();
}

function addProduct() {

  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const image = document.getElementById("productImage").value;
  const category = document.getElementById("productCategory").value;

  const products = JSON.parse(localStorage.getItem("products")) || [];

  products.push({
    name,
    price,
    image,
    category
  });

  localStorage.setItem("products", JSON.stringify(products));

  renderAdminProducts();

  alert("Product Added");
}

function renderAdminProducts() {

  const products = JSON.parse(localStorage.getItem("products")) || [];

  const container = document.getElementById("adminProductsList");

  container.innerHTML = "";

  products.forEach((product, index) => {

    container.innerHTML += `
      <div class="admin-item">
        <div>
          <h3>${product.name}</h3>
          <p>${product.price}</p>
        </div>

        <button onclick="deleteProduct(${index})">Delete</button>
      </div>
    `;
  });
}

function deleteProduct(index) {

  const products = JSON.parse(localStorage.getItem("products")) || [];

  products.splice(index, 1);

  localStorage.setItem("products", JSON.stringify(products));

  renderAdminProducts();
}

function addCategory() {

  const categoryName = document.getElementById("categoryName").value;

  const categories = JSON.parse(localStorage.getItem("categories")) || [];

  categories.push(categoryName);

  localStorage.setItem("categories", JSON.stringify(categories));

  renderCategories();
}

function renderCategories() {

  const categories = JSON.parse(localStorage.getItem("categories")) || [];

  const container = document.getElementById("adminCategoriesList");

  container.innerHTML = "";

  categories.forEach((category, index) => {

    container.innerHTML += `
      <div class="admin-item">
        <h3>${category}</h3>

        <button onclick="deleteCategory(${index})">Delete</button>
      </div>
    `;
  });
}

function deleteCategory(index) {

  const categories = JSON.parse(localStorage.getItem("categories")) || [];

  categories.splice(index, 1);

  localStorage.setItem("categories", JSON.stringify(categories));

  renderCategories();
}

checkUser();
