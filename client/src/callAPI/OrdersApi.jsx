import axios from "axios";

export async function initiateOrder(userData, orderSpecsCurrent) {
  try {
    let api_url = "http://localhost:5000/api/delivery/orders";

    const res = await axios.post(
      `${api_url}/order`,
      {
        ordersSpecs: orderSpecsCurrent,
        user: userData,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const order = await res.data.data;

    console.log(order);

    return order;
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
          "Content-Type": "application/json",
        },
      }
    );

    const order = res.data.data;

    console.log(order);

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
          "Content-Type": "application/json",
        },
      }
    );

    const order = res.data.data;

    return order;
  } catch (err) {
    console.log(err);
  }
}
