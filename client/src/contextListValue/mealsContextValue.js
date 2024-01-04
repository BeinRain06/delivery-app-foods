import { getMeals } from "../callAPI/MealsApi";

class MealsSendValue {
  constructor() {
    this._callMeals = getMeals();
    this._meals = [];
    this.sendAllMeals();
  }
  async sendAllMeals() {
    try {
      const res = await this._callMeals;
      console.log("this._meals :", res.data.data);
      return (this._meals = res.data.data);
    } catch (err) {
      console.log(err);
    }
  }
}

export default MealsSendValue;
