!function(t){var e={};function a(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=e,a.d=function(t,e,r){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(r,n,function(e){return t[e]}.bind(null,n));return r},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=0)}([function(t,e,a){"use strict";a.r(e);var r=class{async getProducts(){try{let t=await fetch("/dist/assets/products.json"),e=(await t.json()).items;return e=e.map(t=>{const{title:e,price:a}=t.fields,{id:r}=t.sys;return{title:e,price:a,id:r,image:t.fields.image.fields.file.url}}),e}catch(t){console.log(t)}}};var n=class{static saveProducts(t){localStorage.setItem("products",JSON.stringify(t))}static saveCart(t){localStorage.setItem("cart",JSON.stringify(t))}static getProduct(t){return JSON.parse(localStorage.getItem("products")).find(e=>e.id===t)}static getCart(){return localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[]}};const i=document.querySelector(".cart-btn"),s=document.querySelector(".close-cart"),c=document.querySelector(".clear-cart"),o=document.querySelector(".cart"),l=document.querySelector(".cart-overlay"),d=document.querySelector(".cart-items"),u=document.querySelector(".cart-total"),m=document.querySelector(".cart-content"),p=document.querySelector(".products-center");let f=[],g=[];var h=class{displayProducts(t){let e="";t.forEach(t=>{e+=`<article class="product">\n           <div class="img-container">\n               <img\n                   src="${t.image}"\n                   alt="product"\n                   class="product-img"\n               />\n               <button class="bag-btn" data-id=${t.id}>\n                   <i class="fas fa-shopping-cart"></i>\n                   add to cart\n               </button>\n           </div>\n           <h3>${t.title}</h3>\n           <h4>$${t.price}</h4>\n       </article>\n           `}),p.innerHTML=e}getBagButtons(t){const e=[...document.querySelectorAll(".bag-btn")];g=e,e.forEach(t=>{let e=t.dataset.id;f.find(t=>t.id===e)&&(t.innerText="In Cart",t.disabled=!0),t.addEventListener("click",t=>{t.target.innerText="In Cart",t.target.disabled=!0;let a={...n.getProduct(e),amount:1};f=[...f,a],n.saveCart(f),this.setCartValues(f),this.addCartItem(a),this.showCart()})})}setCartValues(t){let e=0,a=0;t.map(t=>{e+=t.price*t.amount,a+=t.amount}),u.innerText=parseFloat(e.toFixed(2)),d.innerText=a}addCartItem(t){const e=document.createElement("div");e.classList.add("cart-item"),e.innerHTML=`<img src="${t.image}" alt="product" />\n        <div class="">\n            <h4>${t.title}</h4>\n            <h5>$${t.price}</h5>\n            <span class="remove-item" data-id=${t.id}>remove </span>\n        </div>\n        <div class="">\n            <i class="fas fa-chevron-up" data-id=${t.id}></i>\n            <p class="item-amount">${t.amount}</p>\n            <i class="fas fa-chevron-down" data-id=${t.id}></i>\n        </div>`,m.appendChild(e)}showCart(){l.classList.add("transparentBcg"),o.classList.add("showCart")}hideCart(){l.classList.remove("transparentBcg"),o.classList.remove("showCart")}setupApp(){f=n.getCart(),this.setCartValues(f),this.populateCart(f),i.addEventListener("click",this.showCart),s.addEventListener("click",this.hideCart)}populateCart(t){t.forEach(t=>{this.addCartItem(t)})}cartLogic(){c.addEventListener("click",()=>{this.clearCart()}),m.addEventListener("click",t=>{let e=t.target,a=e.dataset.id,r=this;!function(){if(e.classList.contains("remove-item"))m.removeChild(e.parentElement.parentElement),r.removeItem(a);else if(e.classList.contains("fa-chevron-up")){let t=f.find(t=>t.id===a);t.amount+=1,n.saveCart(f),r.setCartValues(f),e.nextElementSibling.innerText=t.amount}else if(e.classList.contains("fa-chevron-down")){let t=f.find(t=>t.id===a);t.amount>1?(t.amount-=1,n.saveCart(f),r.setCartValues(f),e.previousElementSibling.innerText=t.amount):(m.removeChild(e.parentElement.parentElement),r.removeItem(a))}}()})}clearCart(){for(f.map(t=>t.id).forEach(t=>this.removeItem(t));m.children.length>0;)m.removeChild(m.children[0]);this.hideCart()}removeItem(t){f=f.filter(e=>e.id!==t),this.setCartValues(f),n.saveCart(f);let e=this.getSingleButton(t);e.disabled=!1,e.innerHTML='<i class="fas fa-shopping-cart"></i>\n        add to cart',this.populateCart(f)}getSingleButton(t){return g.find(e=>e.dataset.id===t)}};document.addEventListener("DOMContentLoaded",()=>{const t=new r,e=new h;e.setupApp(),t.getProducts().then(t=>{e.displayProducts(t),n.saveProducts(t)}).then(()=>{e.getBagButtons(),e.cartLogic()})})}]);