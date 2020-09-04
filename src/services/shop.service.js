import http from '../http-common';

class ShopDataService{

    getAll(){
        return http.get("/shop");
    }
    get(id) {
        return http.get(`/shop/${id}`);
      }
    create(data){
        return http.post("/shop",data);
    }
    update(id,data){
        return http.put(`/shop/${id}`,data);
    }
    delete(id){
        return http.delete(`/shop/${id}`);
    }

}

export default new ShopDataService();