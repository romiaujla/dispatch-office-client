import React, { Component } from "react";
import "./LoadListBox.css";
import AppContext from "../../Contexts/AppContext";
import { Link } from "react-router-dom";
import {
  formatDate,
  formatCurrency,
  arrayIsEmpty
} from '../../HelperFunctions/HelperFunctions'
import config from "../../config";

class LoadListBox extends Component {
  
  static contextType = AppContext;

  static defaultProps = {
    loadStatus: [],
    boxHeader: 'Loads',
    shipments: [],
  };

  // return the list of shipments
  renderShipments = (shipments) => {
    
    if(arrayIsEmpty(shipments)){
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
              <div className="miles">
                <h6>Loaded Miles</h6>
                <br />
                {shipment.miles}
              </div>
              <div className="status">
                <h6>Status</h6>
                <br />
                <span className="red-bold">{shipment.status}</span>
              </div>
            </div>
            <div className="status-line">
              <div className="circle left"></div>
              <div className="line"></div>
              <div className="circle right"></div>
            </div>
            <div className="rate-broker">
              <div className="rate">
                <h6>Rate</h6>
                <br />
                <span className="rate-amount red-bold">
                  {formatCurrency(shipment.rate)}
                </span>
              </div>
              <div className="broker">
                <h6>Broker</h6>
                <br />
                {shipment.broker}
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
            <Link className='app-button' to={`${config.BASEPATH}/load/${shipment.id}`}>
              Update / View
            </Link>
            <Link className='app-button' to={`${config.BASEPATH}/load/edit/${shipment.id}`}>
              Edit
            </Link>
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
