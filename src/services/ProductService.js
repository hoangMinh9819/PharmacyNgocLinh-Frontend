import axiosS from './axiosS';
class ProductService {
    getProductsList(page,size){
        return axiosS.get(`products?page=${page}&size=${size}`);
    }
    getProductsListByName(page,size,name){
        return axiosS.get(`products/search/${name}?page=${page}&size=${size}`);
    }
    getProductById(id){
        return axiosS.get(`products/`+id);
    }
    addProduct(productDTO){
        return axiosS.post('products',productDTO);
    }
    updateProduct(productDTO){
        return axiosS.put('products',productDTO)
    }
    deleteProduct(id) {
        return axiosS.delete('products/'+id)
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductService();
