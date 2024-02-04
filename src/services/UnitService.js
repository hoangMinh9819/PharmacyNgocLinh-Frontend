import axiosS from './axiosS';

class UnitService{
    getUnitsList(){
        return axiosS.get(`units`);
    }
    getUnitById(id){
        return axiosS.get(`units/`+id);
    }
    addUnit(unitDTO){
        return axiosS.post('units',unitDTO)
            .then(res=>{
                console.log(res.data)
            })
            .catch(err=>{
                console.log(err.message);
            });
    }
    deleteUnit(id) {
        return axiosS.delete('units/'+id)
    }
    updateUnit(unitDTO){
        return axiosS.put('units',unitDTO)
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UnitService();