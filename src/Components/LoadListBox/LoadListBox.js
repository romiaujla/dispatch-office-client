import React, { Component } from "react";
import "./LoadListBox.css";
import AppContext from "../../Contexts/AppContext";
import { Link } from "react-router-dom";

class LoadListBox extends Component {
  static contextType = AppContext;

  static defaultProps = {
    loadStatus: ""
  };

  formatDate = dbDate => {
    const date = new Date(dbDate);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getYear();

    return `${month + 1}/${day}/${year + 1900}`;
  };


  // A Method that sorts shipments as per the property requested
  sortShipments = (shipments, property) => {
    return shipments.sort((a, b) => (a[property] < b[property] ? 1 : -1));
  };

  getLoadsWithStatus = status => {
    const { basePath } = this.context;
    let shipments;
    if (status !== "all") {
      // filter shipments based on load status passed in props
      shipments = this.context.shipments.filter(
        shipment => shipment.status === status
      );
    } else {
      shipments = this.context.shipments.filter(shipment => shipment);
      // get sorted shipments with pickup date
      shipments = this.sortShipments(shipments, "pickup_date");
    }

    if (shipments.length === 0) {
      return <li className="empty-list">No {status} Loads</li>;
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
              Date: {this.formatDate(shipment.pickup_date)}
            </span>
          </div>
          <div className="status-line-wrapper">
            <div className="rate-broker">
              <div className="miles">
                <h6>Loaded Miles</h6>
                <br />
                {shipment.miles}
              </div>
              {status === "all" ? (
                <div className="status">
                  <h6>Status</h6>
                  <br />
                  <span className="red-bold">{shipment.status}</span>
                </div>
              ) : (
                ""
              )}
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
                  $
                  {shipment.rate
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
              Date: {this.formatDate(shipment.delivery_date)}
            </span>
          </div>
          <div className="load-buttons">
            <Link className='app-button' to={`${basePath}/loads/${shipment.id}`}>
                View
            </Link>
            <Link className='app-button' to={`${basePath}/loads/edit/${shipment.id}`}>
                Edit
            </Link>
          </div>
        </li>
      );
    });
  };

  render() {
    return (
      <div className="LoadListBox blue-text">
        <h3 className="blue-back white-text">{this.props.loadStatus} Loads</h3>
        <ul className="un-assigned-loads">
          {this.getLoadsWithStatus(this.props.loadStatus)}
        </ul>
      </div>
    );
  }
}

export default LoadListBox;
