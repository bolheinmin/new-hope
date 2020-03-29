import { ShoppingCart } from './shopping-cart';
export class Order {
	dateplaced: any;
	items: any[];

	constructor(public userId: string, public shipping: any, public cart: ShoppingCart) {
		this.dateplaced = new Date();

		this.items = cart.items.map((item) => {
			return {
				product: {
					title: item.title,
					price: item.price,
					imageUrl: item.imageUrl
				},
				quantity: item.quantity,
				totalPrice: item.totalPrice
			};
		});
	}
}
