// Shopping Cart Factory (Modern JS)

const createShoppingCart = () => {
    let items = [];
    let discount = 0;

    return {

        // Add item (uses array method)
        addItem: (item) => {
            const existing = items.find(i => i.id === item.id);

            if (existing) {
                existing.quantity += item.quantity;
            } else {
                items.push({ ...item });
            }
        },

        // Get items
        getItems: () => items,

        // Update quantity
        updateQuantity: (id, quantity) => {
            items = items.map(item =>
                item.id === id
                    ? { ...item, quantity }
                    : item
            );
        },

        // Remove item (filter)
        removeItem: (id) => {
            items = items.filter(item => item.id !== id);
        },

        // Calculate total (reduce + template literal)
        getTotal: () => {
            let total = items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            if (discount > 0) {
                total -= total * discount / 100;
            }

            return Number(`${total.toFixed(2)}`);
        },

        // Count items (reduce)
        getItemCount: () =>
            items.reduce((count, item) => count + item.quantity, 0),

        // Check empty
        isEmpty: () => items.length === 0,

        // Apply discount
        applyDiscount: (code, percent) => {
            discount = percent;
            console.log(`Discount applied: ${code} (${percent}%)`);
        },

        // Clear cart
        clear: () => {
            items = [];
            discount = 0;
        }
    };
};



// Example Usage
const cart = createShoppingCart();

cart.addItem({ id: 1, name: "Laptop", price: 999, quantity: 1 });
cart.addItem({ id: 2, name: "Mouse", price: 29, quantity: 2 });
cart.addItem({ id: 1, name: "Laptop", price: 999, quantity: 1 });

console.log(cart.getItems());

cart.updateQuantity(1, 3);
cart.removeItem(2);

console.log(cart.getTotal());      // 2997
console.log(cart.getItemCount());  // 3
console.log(cart.isEmpty());       // false

cart.applyDiscount("SAVE10", 10);
console.log(cart.getTotal());      // 2697.30

cart.clear();
console.log(cart.isEmpty());       // true
