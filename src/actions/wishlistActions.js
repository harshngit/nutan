import {
	WISHLIST_TOGGLE_ITEM,
	WISHLIST_LOAD_FROM_STORAGE,
	WISHLIST_STORAGE_KEY,
} from "@/constants/wishlistConstant";

// Toggle full product object
export const toggleWishlistItem = (userId, product) => {
	return (dispatch, getState) => {
		const wishlist = getState().wishlist.wishlist || {};

		const userWishlist = wishlist[userId] || [];
		const exists = userWishlist.some((item) => item.id === product.id);

		const updatedUserWishlist = exists
			? userWishlist.filter((item) => item.id !== product.id)
			: [...userWishlist, product];

		const updatedWishlist = {
			...wishlist,
			[userId]: updatedUserWishlist,
		};

		localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updatedWishlist));

		dispatch({
			type: WISHLIST_TOGGLE_ITEM,
			payload: updatedWishlist,
		});
	};
};

export const loadWishlistFromStorage = () => {
	return (dispatch) => {
		try {
			const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
			const parsed = stored ? JSON.parse(stored) : {};
			dispatch({
				type: WISHLIST_LOAD_FROM_STORAGE,
				payload: parsed,
			});
		} catch (err) {
			console.error("Failed to load wishlist", err);
		}
	};
};