import React from "react";
import styled from "styled-components";

const NewLocation = styled.div`
  position: absolute;
  top: calc(20vh);
  left: 50%;
  transform: translate(-50%, 0);
  width: 80%;
  height: calc(15vh);
  padding: 1em;
  background-color: #3b4d44;
  color: #fff;
`;
const Title = styled.span`
  padding: 0.25em 0;
  font-weight: bold;
  font-size: clamp(0.72rem, 0.82rem, 1rem);
`;

const Area = styled.ul`
  width: 100%;
  padding: 0.5rem 0.25rem;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Li = styled.li`
  padding: 0.25em;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  width: 20px;
  height: 20px;
`;

const Label = styled.label`
  font-size: 0.85em;
`;

const MoreInformation = styled.div`
  position: relative;
  width: 100%;
  margin: o auto;
`;

const NewDirection = styled.form`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const LocationField = styled.ul`
  margin: 0.75rem 0;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LiLocation = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
`;

const InputLocation = styled.input`
  width: 100%;
  height: 40px;
  background: transparent;
  display: flex;
  justify-content: center;
  text-indent: 10%;
  border: 2px solid #eee;
`;

const ReadyToSendLoc = styled.ul`
  width: 100%;
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
`;

const SpreadLoc = styled.li`
  position: relative;
  width: 60px;
  height: 60px;
  margin: 0 auto;
`;

const Button = styled.button`
  background-color: ${(props) => (props.$primary ? "#1c7e4d" : "#d4cfcf")};
  color: ${(props) => (props.$primary ? "#fff" : "#333")};
  border: ${(props) => (props.$primary ? "2px solid #fff" : "2px solid gray")};
  width: 100%;
  height: 100%;
  padding: 0.25em;
  border-radius: 3px;
`;

/* function NewLocationOrder() {
  const newLocationRef = useRef(null);
  const newCityRef = useRef(null);
  const newStreetRef = useRef(null);

  const newRadioRefOne = useRef(null);
  const newRadioRefTwo = useRef(null);

  const closeFromNewLocation = () => {
    handleNewLocation(false);
 
  };

  const handleFirstStepLoc = (e) => {
    e.preventDefault();
    if (newRadioRefOne.current.checked) {
      let phone = e.target.elements.newNum;
      if (phone.value === "") {
        alert("Please Enter a phone number");
        handleNewLocation(false);
       
        return;
      }

      let city = "home";
      let street = "home";

      let newLocation = {
        phone: phone.value,
        city: city,
        street: street,
      };

      setDataNewLocation(newLocation);

      //close new location
      handleNewLocation(false);
     
      phone.value = "";

      //move to one more step
      oneMoreStepRef.current.style.visibility = "visible";
    } else if (newRadioRefTwo.current.checked) {
      let phone = e.target.elements.newNum;
      let city = e.target.elements.newCity;
      let street = e.target.elements.newStreet;

      if (phone.value === "" || city.value === "" || street.value === "") {
        alert("Please Enter All the field");
        handleNewLocation(false);
        
        return;
      }
      let newlocation = {
        phone: phone.value,
        city: city.value,
        street: street.value,
      };
      setDataNewLocation(newlocation);

      //close new location box
      handleNewLocation(false);
     

      phone.value === "";
      city.value === "";
      street.value === "";

      //move to one more step
      oneMoreStepRef.current.style.visibility = "visible";
    }
  };

  const handleNewRadioInput = (e) => {
    if (e.target.id === "name_area_one") {
      newLocationRef.current.style.visibility = "visible";
      newCityRef.current.style.display = "none";
      newStreetRef.current.style.display = "none";
    } else if (e.target.id === "name_area_two") {
      newLocationRef.current.style.visibility = "visible";
      newCityRef.current.style.display = "block";
      newStreetRef.current.style.display = "block";
    }
  };
  return (
    <div className="wrapping_new_location">
      <span className="title_hold">Location</span>
      <ul className="figure_area" onChange={handleNewRadioInput}>
        <li>
          <input
            type="radio"
            name="location"
            id="name_area_one"
            className="name_area area_expected_one"
            ref={newRadioRefOne}
          />
          <label htmlFor="home">home</label>
        </li>
        <li>
          <input
            type="radio"
            name="location"
            id="name_area_two"
            className="name_area area_expected_two"
            ref={newRadioRefTwo}
          />
          <label htmlFor="home">new Location</label>
        </li>
      </ul>
      <div className="add_more_info">
        <form
          className="control_in_new_direction"
          onSubmit={handleFirstStepLoc}
        >
          <ul className="list_appearance" ref={newLocationRef}>
            <li className="adding_phone">
              <label htmlFor="phone"> add a number</label>
              <input
                type="number"
                name="newNum"
                id="number_add"
                className="number_add"
              />
            </li>
            <li className="adding_city" ref={newCityRef}>
              <label htmlFor="city">city</label>
              <input
                type="text"
                name="newCity"
                id="city_add"
                className="city_add"
              />
            </li>
            <li className="adding_street" ref={newStreetRef}>
              <label htmlFor="street">street</label>
              <input
                type="text"
                name="newStreet"
                id="street_add"
                className="street_add"
              />
            </li>
          </ul>

          <ul className="spread_new_button">
            <li id="spread_reject">
              <button
                type="button"
                className="btn_on_new btn_loc_one"
                onClick={closeFromNewLocation}
              >
                Reject
              </button>
            </li>
            <li id="spread_ok">
              <button type="submit" className="btn_on_new btn_loc_two">
                OK
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
} */

function NewLocationOrder({ setIsMoreOneStep, setDataNewLocation }) {
  const newRadioRefOne = useRef(null);
  const newRadioRefTwo = useRef(null);

  const newLocationRef = useRef(null);
  const newCityRef = useRef(null);
  const newStreetRef = useRef(null);

  const closeFromNewLocation = () => {
    handleNewLocation(false);
  };

  const handleFirstStepLoc = (e) => {
    e.preventDefault();
    if (newRadioRefOne.current.checked) {
      let phone = e.target.elements.newNum;
      if (phone.value === "") {
        alert("Please Enter a phone number");
        handleNewLocation(false);
        return;
      }

      let city = "home";
      let street = "home";

      let newLocation = {
        phone: phone.value,
        city: city,
        street: street,
      };

      setDataNewLocation(newLocation);

      //close new location
      handleNewLocation(false);
      phone.value = "";

      //move to one more step
      /*  oneMoreStepRef.current.style.visibility = "visible"; */
      setIsMoreOneStep(true);
    } else if (newRadioRefTwo.current.checked) {
      let phone = e.target.elements.newNum;
      let city = e.target.elements.newCity;
      let street = e.target.elements.newStreet;

      if (phone.value === "" || city.value === "" || street.value === "") {
        alert("Please Enter All the field");
        handleNewLocation(false);
        return;
      }
      let newlocation = {
        phone: phone.value,
        city: city.value,
        street: street.value,
      };
      setDataNewLocation(newlocation);

      //close new location box
      handleNewLocation(false);

      phone.value === "";
      city.value === "";
      street.value === "";

      //move to one more step
      oneMoreStepRef.current.style.visibility = "visible";
      setIsMoreOneStep(true);
    }
  };

  const handleNewRadioInput = (e) => {
    if (e.target.id === "name_area_one") {
      newLocationRef.current.style.visibility = "visible";
      newCityRef.current.style.display = "none";
      newStreetRef.current.style.display = "none";
    } else if (e.target.id === "name_area_two") {
      newLocationRef.current.style.visibility = "visible";
      newCityRef.current.style.display = "block";
      newStreetRef.current.style.display = "block";
    }
  };

  return (
    <NewLocation>
      <Title>LOcation</Title>
      <Area onChange={handleNewRadioInput}>
        <Li>
          <Input
            type="radio"
            name="location"
            id="name_area_one"
            ref={newRadioRefOne}
          />
          <Label htmlFor="home">home</Label>
        </Li>
        <Li>
          <Input
            type="radio"
            name="location"
            id="name_area_two"
            ref={newRadioRefTwo}
          />
          <Label htmlFor="home">new location</Label>
        </Li>
      </Area>
      <MoreInformation>
        <NewDirection onSubmit={handleFirstStepLoc}>
          <LocationField>
            <LiLocation ref={newLocationRef}>
              <Label htmlFor="phone">add a Number</Label>
              <InputLocation type="number" name="newNum" id="number_add" />
            </LiLocation>
            <LiLocation ref={newCityRef}>
              <Label htmlFor="city">city</Label>
              <InputLocation type="text" name="newCity" id="city_add" />
            </LiLocation>
            <LiLocation ref={newStreetRef}>
              <Label htmlFor="street">street</Label>
              <InputLocation type="text" name="newStreet" id="street_add" />
            </LiLocation>
          </LocationField>
          <ReadyToSendLoc>
            <SpreadLoc id="spread_reject">
              <Button type="button" onClick={closeFromNewLocation}>
                Reject
              </Button>
            </SpreadLoc>
            <SpreadLoc id="spread_ok">
              <Button $primary type="submit">
                OK
              </Button>
            </SpreadLoc>
          </ReadyToSendLoc>
        </NewDirection>
      </MoreInformation>
    </NewLocation>
  );
}

export default NewLocationOrder;
