// All your product data and functions are here at the top...
const products=[{id:1,name:"Classic White T-Shirt",price:900,image:"assets/whiteTshirt.jpg",category:"T-Shirts",description:"A comfortable classic white t-shirt made from 100% organic cotton, perfect for everyday wear. Features a regular fit and crew neck design."},{id:2,name:"Black Slim-Fit Jeans",price:1600,image:"assets/blackJeans.jpg",category:"Jeans",description:"Stylish black slim-fit jeans made from stretchy denim material. Perfect for casual or semi-formal occasions."},{id:3,name:"Floral Summer Dress",price:1550,image:"assets/summerDress.jpg",category:"Dresses",description:"Beautiful floral summer dress with a flowy design. Made from lightweight material perfect for hot weather."},{id:4,name:"Navy Blue Blazer",price:2e3,image:"assets/blueBlazer.jpg",category:"Outerwear",description:"Elegant navy blue blazer suitable for formal events or business meetings. Features a modern cut and premium fabric."},{id:5,name:"Athletic Sneakers",price:4e3,image:"assets/athleticSneakers.jpg",category:"Footwear",description:"Comfortable athletic sneakers with cushioned soles, perfect for running, gym workouts, or casual wear."},{id:6,name:"Leather Belt",price:400,image:"assets/leatherBelt.jpg",category:"Accessories",description:"High-quality leather belt with metal buckle. A versatile accessory for any outfit."},{id:7,name:"Striped Polo Shirt",price:1300,image:"assets/poloShirt.jpg",category:"T-Shirts",description:"Classic striped polo shirt with a comfortable fit. Perfect for casual outings or golf sessions."},{id:8,name:"Denim Jacket",price:2500,image:"assets/denimJacket.jpg",category:"Outerwear",description:"Trendy denim jacket with a vintage wash. A timeless piece that goes with almost any outfit."}];function getAllProducts(){return products}function getProductById(t){return products.find(e=>e.id===Number(t))}function getProductsByCategory(t){return products.filter(e=>e.category===t)}function getUniqueCategories(){return[...new Set(products.map(t=>t.category))]}function searchProducts(t){const e=t.toLowerCase();return products.filter(t=>t.name.toLowerCase().includes(e)||t.description.toLowerCase().includes(e)||t.category.toLowerCase().includes(e))}function createProductCard(t){return`
    <div class="product-card">
      <a href="product-details.html?id=${t.id}">
        <div class="product-image">
          <img src="${t.image}" alt="${t.name}">
        </div>
      </a>
      <div class="product-info">
        <a href="product-details.html?id=${t.id}">
          <h3>${t.name}</h3>
        </a>
        <p class="product-category">${t.category}</p>
        <div class="product-card-actions">
          <div class="product-price">Rs. ${t.price.toFixed(2)}</div>
          <button class="btn btn-primary add-to-cart" data-id="${t.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            Add
          </button>
        </div>
      </div>
    </div>
  `}function createCategoryCard(t){return`
    <a href="products.html?category=${encodeURIComponent(t)}" class="category-card">
      <div class="category-icon">${t.charAt(0)}</div>
      <h3>${t}</h3>
    </a>
  `}function initProductsPage(){const t=document.getElementById("products-grid"),e=document.getElementById("category-filters"),o=document.getElementById("product-search"),a=document.getElementById("no-products-message");if(!t)return;const c=new URLSearchParams(window.location.search),n=c.get("category");let i=n?getProductsByCategory(n):getAllProducts();function d(c){t.innerHTML="",0===c.length?a.style.display="block":(a.style.display="none",c.forEach(e=>{t.innerHTML+=createProductCard(e)})),document.querySelectorAll(".add-to-cart").forEach(t=>{t.addEventListener("click",function(t){t.preventDefault();const e=this.getAttribute("data-id");addToCart(getProductById(e),1)})})}d(i);const r=getUniqueCategories();r.forEach(t=>{const o=document.createElement("button");o.className="filter-btn",o.textContent=t,o.dataset.category=t,t===n&&(o.classList.add("active"),document.querySelector('.filter-btn[data-category="all"]').classList.remove("active")),e.appendChild(o)}),document.querySelectorAll(".filter-btn").forEach(t=>{t.addEventListener("click",function(){document.querySelectorAll(".filter-btn").forEach(t=>{t.classList.remove("active")}),this.classList.add("active");const t=this.dataset.category;i="all"===t?getAllProducts():getProductsByCategory(t),o.value&&(i=i.filter(t=>t.name.toLowerCase().includes(o.value.toLowerCase())||t.description.toLowerCase().includes(o.value.toLowerCase()))),d(i)})}),o&&o.addEventListener("input",function(){const t=this.value.toLowerCase();let e;const a=document.querySelector(".filter-btn.active"),c=a.dataset.category;e="all"===c?searchProducts(t):getProductsByCategory(c).filter(e=>e.name.toLowerCase().includes(t)||e.description.toLowerCase().includes(t)),d(e)})}function initFeaturedProducts(){const t=document.getElementById("featured-products");if(!t)return;const e=getAllProducts().slice(0,4);e.forEach(e=>{t.innerHTML+=createProductCard(e)}),document.querySelectorAll(".add-to-cart").forEach(t=>{t.addEventListener("click",function(t){t.preventDefault();const e=this.getAttribute("data-id");addToCart(getProductById(e),1)})})}function initCategories(){const t=document.getElementById("category-grid");if(!t)return;const e=getUniqueCategories();e.forEach(e=>{t.innerHTML+=createCategoryCard(e)})}

// NEW: Function to display the success message
function displayOrderSuccessMessage() {
    if (sessionStorage.getItem('orderPlacedSuccessfully') === 'true') {
        const banner = document.createElement('div');
        banner.className = 'success-banner';
        banner.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Order Placed Successfully!</span>
        `;
        document.body.prepend(banner);
        sessionStorage.removeItem('orderPlacedSuccessfully');

        setTimeout(() => {
            banner.classList.add('fade-out');
            banner.addEventListener('transitionend', () => banner.remove());
        }, 4000);
    }
}

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', function() {
  initProductsPage();
  initFeaturedProducts();
  initCategories();
  
  // Call the function to check for the success message
  displayOrderSuccessMessage(); 

  // Mobile menu logic
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mainNav = document.querySelector('.main-nav');
  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      mainNav.classList.toggle('active');
    });
  }
});