import { ShoppingCartItem } from './shopping-cart-item';
import { Ingredient } from './ingredient';

export class ShoppingCart {
   items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [ingredientId: string]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};

        for(let index in itemsMap) {
            const item = itemsMap[index] as any;
            this.items.push(new ShoppingCartItem({ 
                id: item.payload.doc.id,
                ...item.payload.doc.data()
            }));
        }
    }

    getQuantity(ingredient: Ingredient) {
        let qty = 0;
        this.items.forEach(item => {
            if(item.id === ingredient.id) {
                qty = item.quantity;
                return qty;
            }
        });
        return qty;
    }

    get totalItemsCount() {
        let count = 0;
        this.items.forEach(item => {
         count += item.quantity;
        });
        return count;
    } 

    get totalPrice() {
        let totalPrice = 0;
        this.items.forEach(item => {
         totalPrice += item.totalPrice;
        });
        return totalPrice;
    }
}