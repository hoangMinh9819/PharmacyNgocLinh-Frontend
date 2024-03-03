import axiosS from './axiosS';
class WareHouseService{
    getWareHouseList(){
        return axiosS.get(`warehouses`);
    }
    getWareHouseById(id){
        return axiosS.get(`warehouses/`+id);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new WareHouseService();