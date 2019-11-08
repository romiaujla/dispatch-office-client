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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck, faEdit, faFolderOpen } from '@fortawesome/free-solid-svg-icons'

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
                {shipment.driver.full_name}
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
                <h6>Status</h6>
                <br />
                <span className="">{shipment.status}</span>
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
              <FontAwesomeIcon icon={faFolderOpen} className='update-icon' />
              Update / View
            </Link>
            <Link className='app-button' to={`${config.BASEPATH}/load/edit/${shipment.id}`}>
              <FontAwesomeIcon icon={faEdit} className='edit-icon' />
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
