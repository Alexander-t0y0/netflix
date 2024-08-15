document.addEventListener("DOMContentLoaded", function () {
    const scrollLeftBtns = document.querySelectorAll(".scroll-left-btn");
    const scrollRightBtns = document.querySelectorAll(".scroll-right-btn");
    const rowPostersContainers = document.querySelectorAll(".row-posters");
  
    scrollLeftBtns.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        rowPostersContainers[index].scrollBy({
          left: -200,
          behavior: "smooth"
        });
      });
    });
  
    scrollRightBtns.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        rowPostersContainers[index].scrollBy({
          left: 200,
          behavior: "smooth"
        });
      });
    });
  });
  
  let isCartOpen = false; // Initialize boolean variable to track cart state

  const iconCart = document.querySelector('.icon-cart');
  const body = document.querySelector('.cart-tab'); // Corrected selector

  iconCart.addEventListener('click', () => {
      isCartOpen = !isCartOpen; // Toggle cart state
      if (isCartOpen) {
          body.classList.add('show-cart'); // Add class to show cart
      } else {
          body.classList.remove('show-cart'); // Remove class to hide cart
      }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartDisplay() {
        const cartCount = document.querySelector('.icon-cart span');
        cartCount.textContent = cart.length;
        const listCart = document.querySelector('.list-cart');
        listCart.innerHTML = ''; // Clear existing items

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'item';
            cartItem.innerHTML = `
                <div class="image">
                    <img src="netflix-images/${item.image}" alt="${item.title}">
                </div>
                <div class="total-prize">$${item.price}</div>
                <button class="remove-cart" data-id="${item.id}">X</button>
            `;
            listCart.appendChild(cartItem);
        });

        document.querySelectorAll('.remove-cart').forEach(button => {
            button.addEventListener('click', () => {
                const movieId = button.getAttribute('data-id');
                removeFromCart(movieId);
            });
        });

        if (cart.length > 0) {
            document.querySelector('.cart-tab').classList.add('show-cart');
        } else {
            document.querySelector('.cart-tab').classList.remove('show-cart');
        }
    }

    function addToCart(movie) {
        if (!cart.some(item => item.id === movie.id)) {
            cart.push(movie);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        } else {
            alert("This item is already in the cart.");
        }
    }

    function removeFromCart(movieId) {
        const movieIndex = cart.findIndex(item => item.id === movieId);
        if (movieIndex > -1) {
            cart.splice(movieIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    }

    function loadMovies() {
        fetch('products.json')
            .then(response => response.json())
            .then(movies => {
                const posterContainer = document.getElementById('poster-container');
                movies.forEach(movie => {
                    const movieItem = document.createElement('div');
                    movieItem.className = 'movie-item';
                    movieItem.innerHTML = `
                        <img src="netflix-images/${movie.image}" alt="${movie.title}" class="row-poster">
                        <button class="add-cart" data-id="${movie.id}">Add to Cart</button>
                    `;
                    posterContainer.appendChild(movieItem);

                    movieItem.querySelector('.add-cart').addEventListener('click', () => {
                        addToCart(movie);
                    });
                });
            })
            .catch(error => console.error('Error loading movies:', error));
    }

    loadMovies();
    updateCartDisplay();

    document.querySelector('.close').addEventListener('click', () => {
        document.querySelector('.cart-tab').classList.remove('show-cart');
    });

    document.querySelector('.check-out').addEventListener('click', () => {
        alert('Check-out functionality not implemented yet.');
    });

    document.querySelector('.icon-cart').addEventListener('click', () => {
        document.querySelector('.cart-tab').classList.toggle('show-cart');
    });
});
