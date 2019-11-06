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

  addNewEquipment(unit_num){
    return fetch(`${config.API_ENDPOINT}/equips`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        unit_num,
      })
    })
      .then(response => response.json())
      .then(equipments => equipments)
      .catch(error => {
        console.log(error);
      });
  },

  updateEquipment(unit_num, status, id){
    return fetch(`${config.API_ENDPOINT}/equips/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        unit_num,
        status,
      })
    })
      .then(response => response.json())
      .then(equipments => equipments)
      .catch(error => {
        console.log(error);
      });
  }
};

export default EquipmentService;
