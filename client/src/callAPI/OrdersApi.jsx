import axios from "axios";
import qs from "qs";

export async function initiateOrder(userData, orderSpecsCurrent) {
  try {
    let api_url = "http://localhost:5000/api/delivery/orders/order";

    console.log("API-orderSpecsCurrent :", orderSpecsCurrent);
    const ordersSpecs = orderSpecsCurrent;

    const params = {
      ordersSpecs: orderSpecsCurrent,
      user: userData,
      city: "home",
      street: "home",
    };

    const response = await fetch(api_url, {
      method: "POST",
      body: JSON.stringify(params),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log("data posted:", data))
      .catch((error) => {
        console.error("Error:", error);
      });

    /* return await response.json(); */

    /*  const order = await response.data.data;

    console.log("order inititated:", order);

    return order; */
  } catch (err) {
    console.log(err);
  }
}

export async function updateThisLocationOrder(dataNewLocation, orderId) {
  try {
    const { phone, city, street } = dataNewLocation;

    let api_url = "http://localhost:5000/api/delivery/orders/order/newlocation";

    const res = await axios.put(
      `${api_url}/${orderId}`,
      {
        phone: phone,
        city: city,
        street: street,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const order = res.data.data;

    console.log("ordered:", order);

    return order;
  } catch (err) {
    console.log(err);
  }
}

export async function updateThisTotalPriceOrder(orderId, orderSpecsCurrent) {
  try {
    let api_url = "http://localhost:5000/api/delivery/orders/order";

    const res = await axios.put(
      `${api_url}/${orderId}`,
      {
        orderSpecs: orderSpecsCurrent,
      },

      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const order = res.data.data;

    return order;
  } catch (err) {
    console.log(err);
  }
}
