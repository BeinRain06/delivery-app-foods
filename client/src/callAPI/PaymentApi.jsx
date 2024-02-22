import axios from "axios";

//FOR POST
export async function postPayment(orderId, account, codePayment, totalPrice) {
  //remember you post the Payment when you click on the "validate Button" in template Order.jsx
  try {
    let api_url = "http://localhost:5000/api/delivery/payments/payment";

    let newPayment;

    const res = await axios.post(
      api_url,
      {
        order: orderId, // id_order
        account: account,
        codePayment: codePayment, // default value first
        amountBill: totalPrice,
      },
      {
        headers: {
          /* "Content-Type": "application/json", */
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    newPayment = res.data.data;

    console.log("newPayment initialize...", newPayment);
    //send back payment context Api right function
    return newPayment;
  } catch (err) {
    console.log(err);
  }
}

// ---> HERE FURTHER ADD PART FUNCTION (UPDATE REQUEST) TO FINALIZE THE PAYMENT

//FOR POST
export async function endPayment(paymentId, orderId, account) {
  //remember you post the Payment when you click on the "validate Button" in template Order.jsx
  try {
    let api_url = "http://localhost:5000/api/delivery/payments";

    let endPayment;

    const res = await axios.put(
      `${api_url}/${paymentId}`,
      {
        order: orderId, // id_order
        account: account,
        codePayment: codePayment, // default value first
      },
      {
        headers: {
          /* "Content-Type": "application/json", */
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    endPayment = res.data.data;

    console.log("newPayment completed", endPayment);
    //send back payment context Api right function
    return endPayment;
  } catch (err) {
    console.log(err);
  }
}
