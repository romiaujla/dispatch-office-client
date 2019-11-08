import React, { Component } from "react";
import "./LoadListBox.css";
import AppContext from "../../Contexts/AppContext";
import {
  formatDate,
  arrayIsEmpty
} from '../../HelperFunctions/HelperFunctions'
import config from "../../config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck } from '@fortawesome/free-solid-svg-icons'
import { UpdateViewButton, EditButton } from "../Utils/Utils";

class LoadListBox extends Component {

  static contextType = AppContext;

  static defaultProps = {
    loadStatus: [],
    boxHeader: 'Loads',
    shipments: [],
  };

  // return the list of shipments
  renderShipments = (shipments) => {

    if (arrayIsEmpty(shipments)) {
      return (
        <li className='no-shipments'>
          <div>
            No Shipments Found
          </div>
        </li>
      )
    }

    return shipments.map(shipment => {
      return (
        <li className="load" key={shipment.id}>
          <div className="pick-up">
            <h6>Pick-up</h6>
            <br />
            <span className="red-bold">
              {shipment.pickup_warehouse.city},{" "}
              {shipment.pickup_warehouse.state}
              <br />
              Date: {formatDate(shipment.pickup_date)}
            </span>
          </div>
          <div className="status-line-wrapper">
            <div className="rate-broker">
              <div className="driver">
                <h6>Driver</h6>
                <br />
                {shipment.driver.full_name ? shipment.driver.full_name : 'No Driver Assigned'}
              </div>
            </div>
            <div className="status-line">
              <FontAwesomeIcon icon={faTruck} className={`truck ${shipment.status}`}/>
              <div className={`circle green ${shipment.status}`}></div>
              <div className={`line increase green ${shipment.status}`}></div>
              <div className="line red"></div>
              <div className="circle red"></div>
            </div>
            <div className="rate-broker">
              <div className="status">
                <h6>Equipment #</h6>
                <br />
                <span className="">{shipment.equipment.unit_num ? shipment.equipment.unit_num : `No Equipment Assigned`}</span>
              </div>
            </div>
          </div>
          <div className="delivery">
            <h6>Delivery</h6>
            <br />
            <span className="red-bold">
              {shipment.delivery_warehouse.city},{" "}
              {shipment.delivery_warehouse.state} <br />
              Date: {formatDate(shipment.delivery_date)}
            </span>
          </div>
          <div className="load-buttons">
            <UpdateViewButton to={`${config.BASEPATH}/load/${shipment.id}`}
              className='responsive' 
              status={shipment.status === 'completed' ? 'View Load' : 'Update Load'}
            />
            <EditButton to={`${config.BASEPATH}/load/edit/${shipment.id}`}  className='responsive' />
          </div>
        </li>
      );
    });
  }

  render() {

    const { shipments } = this.props;

    return (
      <div className="LoadListBox blue-text">
        <h3 className="blue-back white-text">{this.props.boxHeader}</h3>
        <ul className="un-assigned-loads">
          {this.renderShipments(shipments)}
        </ul>
      </div>
    );
  }
}

export default LoadListBox;
