import React, { useState, useEffect, useContext, useCallback } from "react";
import styled from "styled-components";
import { MealContext } from "../../services/context/MealsContext";
import { TemplateContext } from "../../services/context/TemplateContext";
import { ValidationContext } from "../../services/context/ValidationContext";
import { endPayment } from "../../callAPI/PaymentApi";
import { fetchOrdersWeek } from "../../callAPI/OrdersApi";
import ErrorWarning from "./styledComponents/MsgError";
import { devices } from "./styledComponents/devices";

const PaymentProcess = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 250px;
    padding: 0.5rem;
    margin: 0 auto;
    color:#fff;
    background-color: #333;
    display: flex;
    flex-direction:column
    justify-content: center;
    align-items: center;
    gap:0.5rem;

  /*    @media ${devices.mobileMiniS} {
    width: 100%;
    font-size: clamp(0.65rem, 1.1em, 1.5em);
  }
  @media ${devices.tablet} {
    width: 70%;
  } */
  `;

const TitleProPay = styled.h4`
  width: 100%;
  padding: 0.5rem 0;
  font-size: clamp(0.74rem, 0.95rem, 1.15rem);
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const PaymentControl = styled.form`
    width: 100%;
    height: auto;
    padding: 0.5rem 0 ;
    display: flex;
    flex-direction:column
    justify-content: center;
    align-items: center;
  `;

const ControlPaymentPanel = styled.div`
    width: 100%;
    height: auto;
    padding: 0.5rem 0 ;
    display: flex;
    flex-direction:column
    justify-content: center;
    gap:0.25rem;
  `;

const Label = styled.label`
  font-size: clamp(0.95rem, 1rem, 1.2rem);
`;

const InputPanelPayment = styled.div`
  width: 100%;
  height: 36px;
  text-indent: 10%;
`;

const BrandOverView = styled.ul`
  width: 100%;
  padding: 0.5rem 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: min-content;
  place-items: center;
  gap: 0.5rem;
`;

const Brand = styled.li`
    width: 100%;
    height:100%;
    padding:0.25rem;
    display: flex;
    flex-direction:column
    justify-content: center;
    gap:0.25rem;
  `;

const Span = styled.span`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const BrandLogo = styled.i`
  width: 100%;
  heigth: 100%;
  object-fit: cover;
`;

const BrandLogoImG = styled.img`
  width: 100%;
  heigth: 100%;
  object-fit: cover;
`;

const BrandName = styled.p`
  font-size: clamp(0, 84rem, 1rem, 1, 15rem);
`;

const Select = styled.select`
  width: 100%;
  height: 36px;
  color: #fff;
  background-color: #ded434;
  text-indent: 10%;
`;

const OptionPanelPayment = styled.option`
    width: 100%;
    height: 100%
    padding: 0.25rem 0;
    font-size: clamp(0.89rem, 1.15rem, 1.3rem);
  `;

const ValidatePayment = styled.ul`
  width: 100%;
  height: auto;
  margin: 0 auto;
`;

const ProcessGuideOne = styled.li`
  width: 100%;
  padding: 0.25rem;
  display: flex;
  justify-content: flex-start;
`;

const ProcessGuideTwo = styled(ProcessGuideOne)`
  justify-content: flex-end;
`;

const ButtonBack = styled.button`
  width: 5rem;
  heigth: 4rem;
  color: #fff;
  background-color: #222;
  border: 2px solid #ddd;
  text-align: center;
`;

const ButtonSend = styled(ButtonBack)`
  background-color: #152b44;
  background-color: #ac2144;
  border: 2px solid #1c7e4d;
`;

/* function PaymentSubmit({ id }) {
 
  return (
    <div className="payment_process">
      <h4 className="title_process_payment">Payment</h4>
      <form className="payment_control">
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
            <option className="option_panel_payment" value="paypal">
              paypal
            </option>
            <option className="option_panel_payment" value="mtn">
              mtn
            </option>
            <option className="option_panel_payment" value="orange">
              orange
            </option>
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
              Send
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
} */

function PaymentSubmit({ id, setIsPayment }) {
  const { handleOrdersWeek, handleOrdersDay } = useContext(MealContext);

  const {
    state: { payments, dataTemplatesOrdersDay },
    handlePayment,
    handleTemplateOrdersDay,
  } = useContext(TemplateContext);

  const {
    state: { isError, componentSectionName, forseen },
    handleIsError,
    handleMessageError,
    handleForSeen,
    handleSectionName,
    handleTimerIn,
  } = useContext(ValidationContext);

  const [availableForPayment, setAvailableForPayment] = useState(payments[+id]);

  const updateOrdersWeek = useCallback(async () => {
    //  Updating Orders List Week!

    const cookies = getCookies();
    const userId = cookies.userId;
    const ordersFetch = await fetchOrdersWeek(userId);
    let newOrdersFetchWeek;
    let newOrdersFetchDay;

    console.log("ordersFetch:", ordersFetch);

    if (ordersFetch.length !== 0) {
      ordersFetch?.map((eltOrder, i) => {
        const indElt = +moment(eltOrder.dateOrdered).format("d");
        newOrdersFetchWeek = { ...newOrdersFetchWeek, [indElt]: eltOrder };

        if (indElt === +moment().format("d")) {
          newOrdersFetchDay = { ...newOrdersFetchDay, [indElt]: eltOrder };
        }
      });

      handleOrdersWeek(newOrdersFetchWeek);
      handleOrdersDay(newOrdersFetchDay);
    }
  }, []);

  const proccessingPayment = useCallback(async (dataPayment) => {
    return await new Promise((resolve) => {
      let { paymentId, account, amountBill } = dataPayment;

      const paymentOnTheEnd = async () => {
        const newSend = await endPayment(paymentId, account, amountBill);
        return newSend;
      };

      let newUpdatedPayment = { ...payments, [payments[+id]]: paymentOnTheEnd };

      let newData = (newData = {
        ...dataTemplatesOrdersDay,
        [payments]: newUpdatedPayment,
      });

      handleTemplateOrdersDay(newData);

      /*  let timerToRemove = timerIn[+id]; */
      const { id, ...rest } = timerIn; // ES9 Object Rest Operator

      console.log("...rest:", rest);

      handleTimerIn(rest);
    });
  }, []);

  function getCookies() {
    let cookies = document.cookie.split(";").reduce((cookies, cookie) => {
      const [name, val] = cookie.split("=").map((c) => c.trim());
      cookies[name] = val;
      return cookies;
    }, {});
    return cookies;
  }

  const endingStepPayment = (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log("willing to end the payment");
    setIsPayment(true);
    const inputCode = e.target.elements.code;
    const selectCompany = e.target.elements.company;
    const inputAmount = e.target.elements.amount;
    let newHoldingPaymentData;

    if (inputCode.value === "" || inputAmount.value === "") {
      handleSectionName("paymentEnd");
      handleForSeen(true);
      handleMessageError(
        "One or two Field Missing. Please Check and Complete."
      );
      handleIsError(true);
      setTimeout(() => {
        handleIsError(false);
      }, 7500);

      return;
    }

    newHoldingPaymentData = {
      paymentId: availableForPayment._id,
      account: selectCompany.value,
      amountBill: inputAmount.value,
    };

    proccessingPayment(newHoldingPaymentData);
  };

  const delayPayment = () => {
    console.log("abort payment");
    setIsPayment(false);
  };

  useEffect(() => {
    console.log("seems to be haing an error...");
  }, [isError]);

  return (
    <>
      <PaymentProcess>
        <TitleProPay>Payment</TitleProPay>
        {isError && <ErrorWarning />}
        <PaymentControl onSubmit={(e) => endingStepPayment(e)}>
          <ControlPaymentPanel>
            <Label htmlFor="code">code Payment</Label>
            <InputPanelPayment type="text" name="code" id="code" />
          </ControlPaymentPanel>
          <ControlPaymentPanel>
            <Label htmlFor="account">account </Label>
            <BrandOverView>
              <Brand>
                <Span>
                  <BrandLogo className="fa-brands fa-cc-paypal"></BrandLogo>
                </Span>
                <BrandName>PayPal</BrandName>
              </Brand>
              <Brand>
                <Span>
                  <BrandLogoImG
                    src={MTN}
                    className="img_payment"
                    alt="missing payment"
                  />
                </Span>
                <BrandName>MTN</BrandName>
              </Brand>
              <Brand>
                <Span>
                  <BrandLogoImG
                    src={ORANGE}
                    className="img_payment"
                    alt="missing payment"
                  />
                </Span>
                <BrandName>ORANGE</BrandName>
              </Brand>
            </BrandOverView>
            <Select id="company" name="company">
              <OptionPanelPayment value="paypal">paypal</OptionPanelPayment>
              <OptionPanelPayment value="mtn">mtn</OptionPanelPayment>
              <OptionPanelPayment value="orange">orange</OptionPanelPayment>
            </Select>
          </ControlPaymentPanel>
          <ControlPaymentPanel>
            <Label htmlFor="amount">amount withdraw</Label>
            <InputPanelPayment type="number" id="amount" name="amount" />
          </ControlPaymentPanel>
          <ValidatePayment>
            <ProcessGuideOne>
              <ButtonBack onClick={delayPayment}>Back</ButtonBack>
            </ProcessGuideOne>
            <ProcessGuideTwo>
              <ButtonSend type="submit">Send</ButtonSend>
            </ProcessGuideTwo>
          </ValidatePayment>
        </PaymentControl>
      </PaymentProcess>
    </>
  );
}

export default PaymentSubmit;
