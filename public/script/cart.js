getCart = () => {
    const cart = sessionStorage.getItem('cart');
    if (cart) {
        return JSON.parse(cart);
    }
    return [];
}

addItem = (cartItem) => {
    let cart = getCart();

    let products = cart.filter(p => p.productId == cartItem.productId);

    if (products.length > 0) {
        let updatedCart = cart.map((p) => {
            if (p.productId === products[0].productId) {
                const newQty = p.qty + cartItem.qty
                return { ...p, qty: newQty, total: products[0].totalPrice * newQty }
            }
            return p;
        });
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
        cart.push(cartItem);
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }
}

removeItem = (productId) => {
    let cart = getCart();
    cart = cart.filter((item) => item.productId !== productId);
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

cleanSession = () => {
    sessionStorage.removeItem('cart');
    sessionStorage.removeItem('shipping');
    sessionStorage.removeItem('selectedProduct');
}

cleanCart = () => {
    sessionStorage.removeItem('cart');
}

setCart = (cart) => {
    cleanCart();
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

goToCart = async (cartItem) => {
    sessionStorage.setItem('selectedProduct', JSON.stringify(cartItem));
    const newUrl = window.location.protocol + '//' + window.location.host + '/cart';
    window.location.href = newUrl
}

getSubTotal = () => {
    const cart = getCart();
    const subTotal = cart.reduce((ac, item) => ac + item.total, 0)
    return subTotal;
}

updMiniCart = () => {
    const miniCart = document.getElementById('mini-cart');
    const cartCount = document.getElementById('cart-count');
    if (!miniCart || !cartCount) {
        return;
    }

    const cart = getCart();

    if (cart.length < 1) {
        miniCart.innerHTML = '';
        cartCount.innerHTML = '0';
        return;
    }

    cartCount.innerHTML = cart.length.toString();

    const listOfProducts = cart.map((product) => {
        return `<div class="product">
                    <div class="product-cart-details">
                        <h4 class="product-title">
                            <a href="/product">${product.productName}</a>
                        </h4>

                        <span class="cart-product-info">
                            <span class="cart-product-qty">${product.qty}</span>
                            x £${product.totalPrice}
                        </span>
                    </div>
                    <!-- End .product-cart-details -->

                    <figure class="product-image-container">
                        <a href="/product" class="product-image">
                            <img src="images/${product.productImage}" alt="product" />
                        </a>
                    </figure>
                    <a href="/category" class="btn-remove" onclick="removeMiniCartItem(${product.productId})" title="Remove Product"
                        ><i class="icon-close"></i></a
                    >
                </div>`
    })

    miniCart.innerHTML = listOfProducts.join('');

    const miniCartSubtotal = document.getElementById('mini-cart-subtotal');
    let subTotal = 0
    if (miniCartSubtotal) {
        subTotal = getSubTotal();
    }
    miniCartSubtotal.innerHTML = `£${subTotal.toFixed(2)}`;
}

removeMiniCartItem = (id) => {
    removeItem(id);
    updMiniCart();
}

setSelectedProduct = (product) => {
    sessionStorage.setItem('selectedProduct', JSON.stringify(product));
}

getSelectedProduct = () => {
    const product = sessionStorage.getItem('selectedProduct');
    if (product) {
        return JSON.parse(product);
    }
    return null;
}

setShippingMethod = (shipping) => {
    sessionStorage.setItem('shippingPrice', JSON.stringify(shipping.price));
}

getShippingMethod = () => {
    const currentCart = getCart()
    const shippingPrice = currentCart[0].shippingPrice


    if (shippingPrice) {
        return JSON.parse(shippingPrice)
    }
    return {
        method: 'Free Shipping CADE O MEU 9',
        price: 0
    }
}

getItem = (product) => {
    return {
        productId: product.productId,
        providerId: product.providerId,
        totalPrice: product.totalPrice,
        shippingPrice: product.shippingPrice,
        productType: product.productType,
        productName: product.productName,
        productDescription: product.productDescription,
        productImage: product.productImage,
        qty: product.qty,
        retailPrice: product.retailPrice,
        unitPrice: product.unitPrice,
        savings: product.savings,
        total: product.total
    }
}