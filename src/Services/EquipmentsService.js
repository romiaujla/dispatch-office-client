import TokenService from "./TokenService";
import config from "../config";

const EquipmentService = {
  getEquipments() {
    return fetch(`${config.API_ENDPOINT}/equips`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(response => response.json())
      .then(equipments => equipments)
      .catch(error => {
        console.log(error);
      });
  },
  addNewEquipment(equipment){
    console.log(equipment);
  },
  updateEquipment(unitt_num, id){
    console.log(`unit_num`, unit_num);
    console.log(id);
  }
};

export default EquipmentService;
