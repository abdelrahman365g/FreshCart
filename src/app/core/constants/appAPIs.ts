import { environment } from "../../../environments/environment";

export const appAPIs = {
    signUp : `${environment.baseUrl}/api/v1/auth/signup`,
    signIn : `${environment.baseUrl}/api/v1/auth/signin`,
    forgotPassword : `${environment.baseUrl}/api/v1/auth/forgotPasswords`,
    verifyResetCode : `${environment.baseUrl}/api/v1/auth/verifyResetCode`,
    resetPassword : `${environment.baseUrl}/api/v1/auth/resetPassword`,
    allProducts : `${environment.baseUrl}/api/v1/products`,
    productDetails : `${environment.baseUrl}/api/v1/products/:id`,
    getAllCategories : `${environment.baseUrl}/api/v1/categories`,
    getSpecificCategory : `${environment.baseUrl}/api/v1/categories/:id`,
    getAllSubcategories : `${environment.baseUrl}/api/v1/subcategories`,
    getSpecificSubcategory : `${environment.baseUrl}/api/v1/subcategories/:id`,
    getSubcategoriesByCategory : `${environment.baseUrl}/api/v1/categories/:id/subcategories`,
    getAllBrands : `${environment.baseUrl}/api/v1/brands`,
    getSpecificBrand : `${environment.baseUrl}/api/v1/brands/:id`,
    getWishlist : `${environment.baseUrl}/api/v1/wishlist`,
    addToWishlist : `${environment.baseUrl}/api/v1/wishlist`,
    removeFromWishlist : `${environment.baseUrl}/api/v1/wishlist/:id`,
    getCart : `${environment.baseUrl}/api/v1/cart`,
    addToCart : `${environment.baseUrl}/api/v1/cart`,
    updateCartProductQuantity : `${environment.baseUrl}/api/v1/cart/:id`,
    removeFromCart : `${environment.baseUrl}/api/v1/cart/:id`,
    clearCart: `${environment.baseUrl}/api/v1/cart`,
    applyCoupon : `${environment.baseUrl}/api/v1/cart/apply-coupon`,

}