import axiosS from './axiosS';
class WareHouseService{
    getWareHouseList(){
        return axiosS.get(`warehouses`);
    }
    getWareHouseById(page,size,id){
        return axiosS.get(`warehouses/${id}?page=${page}&size=${size}`);
    }
    addNewProductInWareHouse(warehouseDetails){
        return axiosS.post(`warehouses`,warehouseDetails);
    }
    deleteWarehouseDetails(idw,idp) {
        return axiosS.delete(`warehouses/${idw}/${idp}`);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new WareHouseService();