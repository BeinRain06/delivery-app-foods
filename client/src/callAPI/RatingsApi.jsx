import axios from "axios";

axios.defaults.withCredentials = true;

// called when the app launch (Welcome.jsx)
export async function getThisUserRatings(userId) {
  let api_url = "http://localhost:5000/api/delivery/ratings/rating";

  try {
    const res = await axios.get(`${api_url}/${userId}`);

    const ratings = await res.data.data; //res.data(axios res) - .data (structured data response in backend)

    console.log("ratings:", ratings);

    return ratings;
  } catch (err) {
    console.log(err);
  }
}

//POST A RATING FOR THE FIRST TIME
export async function ratingFirstime(userId, ratedMealId) {
  try {
    let api_url = `http://localhost:5000/api/delivery/ratings/rating`;

    const response = await axios.post(
      api_url,
      {
        user: userId,
        ratedMeal: ratedMealId,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("new First Time POST in Rating collection:", response);

    return response;
  } catch (err) {
    console.log(err);
  }
}
