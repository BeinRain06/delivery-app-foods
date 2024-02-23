import React from "react";
import styled from "styled-components";
import { devices } from "./styledComponents/devices";

function PaymentSubmit() {
  {
    /* visibility set true when button payment is hitted */
    /* need to use styled-components to style this component */
  }
  return (
    <div className="payment_process">
      <h4 className="title_process_payment">Payment</h4>
      <form action="" className="payment_control">
        <div className="control_payment_panel">
          <label htmlFor="code">code Payment</label>
          <input
            type="text"
            name="code"
            id="code"
            className="input_panel_payment"
          />
        </div>
        <div className="control_payment_panel">
          <label htmlFor="account">account</label>
          <ul className="brand_overview">
            <li className="brand">
              <span>
                <i className="fa-brands fa-cc-paypal"></i>
              </span>
              <p className="brand_name">PayPal</p>
            </li>
            <li className="brand">
              <span>
                <img src={MTN} className="img_payment" alt="missing payment" />
              </span>
              <p className="brand_name">MTN</p>
            </li>
            <li className="brand">
              <span>
                <img
                  src={ORANGE}
                  className="img_payment"
                  alt="missing payment"
                />
              </span>
              <p className="brand_name">ORANGE</p>
            </li>
          </ul>

          <select name="account" id="account" className="account_transaction">
            <input
              type="text"
              name="code"
              id="code"
              className="input_panel_payment"
            />
          </select>
        </div>
        <div className="control_payment_panel">
          <label htmlFor="amount">amount withdraw</label>
          <input
            type="number"
            name="amount"
            id="amount"
            className="input_panel_payment"
          />
        </div>
        <ul className="validate_payment">
          <li className="process_guide">
            <button type="submit" className="payment_load">
              Back
            </button>
          </li>
          <li className="process_guide">
            <button type="submit" className="payment_load">
              Agree
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default PaymentSubmit;
