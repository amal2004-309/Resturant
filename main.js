// main.js
let menu = document.querySelector('#menue-bar');
let navbar = document.querySelector('.navbar');
let scrollTop = document.querySelector('#scroll-top');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    
    if (window.scrollY > 60) {
        scrollTop.classList.add('active');
    } else {
        scrollTop.classList.remove('active');
    }
};



const orderForm = document.querySelector('.order form');

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = orderForm.querySelector('input[type="text"]').value.trim();
    const foodName = orderForm.querySelectorAll('input[type="text"]')[1].value.trim();
    
    if (!name || !foodName) {
        alert('Please fill in all required fields!');
        return;
    }

    // إظهار رسالة تأكيد للمستخدم
    alert(`Thank you, ${name}! Your order for "${foodName}" has been received successfully.`);
    orderForm.reset();
});




let cart = JSON.parse(localStorage.getItem('restaurant_cart')) || [];

const cartCountElement = document.querySelector('#cart-count');

function updateCartCount() {
    if (cartCountElement) {
        cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}


document.querySelectorAll('.popular .box .btn, .spciallity .box .btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const box = e.target.closest('.box');
        const title = box.querySelector('h3') ? box.querySelector('h3').textContent.trim() : 'Food Item';
        const priceText = box.querySelector('.price') ? box.querySelector('.price').textContent.trim() : '$10';
        
        
        const priceMatch = priceText.match(/\d+/);
        const price = priceMatch ? parseFloat(priceMatch[0]) : 10;

        addToCart(title, price);
    });
});

function addToCart(title, price) {
    const existingItem = cart.find(item => item.title === title);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ title, price, quantity: 1 });
    }

    localStorage.setItem('restaurant_cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`Added "${title}" to your cart!`);
}

updateCartCount();


function showToast(message) {
    let toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = message;
    
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

const filterButtons = document.querySelectorAll('.filter-btn');
const foodBoxes = document.querySelectorAll('.popular .box-container .box');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // تغيير الزر النشط
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        foodBoxes.forEach(box => {
            const title = box.querySelector('h3').textContent.toLowerCase();
            
            if (filterValue === 'all' || title.includes(filterValue)) {
                box.style.display = 'block';
                box.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                box.style.display = 'none';
            }
        });
    });
});




const themeToggler = document.querySelector('#theme-toggler');

if (themeToggler) {
    themeToggler.onclick = () => {
        themeToggler.classList.toggle('fa-sun');
        document.body.classList.toggle('dark-theme');

        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };


    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggler.classList.add('fa-sun');
    }
}