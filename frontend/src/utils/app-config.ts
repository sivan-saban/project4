class AppConfig {
    //clients
    public loginUrl = "http://localhost:3004/client/login";
    public registerUrl = "http://localhost:3004/client/register";
    //products
    public productsUrl = "http://localhost:3004/product/all";
    public deleteProductUrl = "http://localhost:3004/product/del/";
    public getProductByIdUrl = "http://localhost:3004/product/single/";
    public addProductUrl = "http://localhost:3004/product/add";
    //category
    public getAllCategoryUrl = "http://localhost:3004/category/all";
    //carts
    public addCartUrl = "http://localhost:3004/cart/add";
    public findCartUrl = "http://localhost:3004/cart/find_cart/";
    //items
    public addItemUrl = "http://localhost:3004/items/add";
    public itemsByCart = "http://localhost:3004/items/all/";
}

export const appConfig = new AppConfig();