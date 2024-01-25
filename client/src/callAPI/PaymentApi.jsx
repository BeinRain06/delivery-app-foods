import {
  affectThisOrder,
  updateStatusPayment,
} from "../context/TemplateContext";
import axios from "axios";

//FOR POST
export async function postPayment(order, account, codePayment) {
  //remember you post the Payment when you click on the "validate Button" in template Order.jsx
  try {
    const { thisOrder, handleThisOrder } = affectThisOrder();
    const { payment, handlePayment } = updateStatusPayment();

    let api_url = "http://localhost:5000/api/delivery/payments";

    let status = "non-paid";
    let resultnewPayment;

    const res = await axios.post(
      `${api_url}/payment`,
      {
        order: order, // id_order
        account: account,
        codePayment: codePayment, // default value first
        status: status,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    resultnewPayment = res.data.data;

    resultnewPayment = [resultnewPayment, ...payment];

    console.log("resultnewPayment", resultnewPayment);
    //send back payment context Api right function
    handlePayment(resultnewPayment);
  } catch (err) {
    console.log(err);
  }
}

// ---> HERE FURTHER ADD PART FUNCTION (UPDATE REQUEST) TO FINALIZE THE PAYMENT
