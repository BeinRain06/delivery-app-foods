import React, { useRef, useContext, useState } from "react";
import styled from "styled-components";
import { TemplateContext } from "../../../services/context/TemplateContext";

const NewLocation = styled.div`
  position: absolute;
  top: calc(55vh);
  left: 50%;
  transform: translate(-50%, 0);
  width: 70%;
  min-height: 100vh;
  padding: 1em;
  background-color: #3b4d44;
  color: #fff;
  border-radius: 3px;
`;
const Title = styled.span`
  padding: 0.25em 0;
  font-weight: bold;
  font-size: clamp(0.72rem, 1.15rem, 1.25rem);
`;

const Area = styled.ul`
  width: 90%;
  padding: 0.5rem 0.25rem;
  margin: 0.5rem auto 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  font-size: 0.95em;
`;

const MoreInformation = styled.div`
  position: relative;
  width: 100%;
  margin: o auto;
`;

const NewDirection = styled.form`
  width: 70%;
  padding: 1rem 0;
  margin: 0 auto;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const LocationField = styled.ul`
  margin: 0.75rem 0rem;
  width: 60%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  color: #eee;
  background: #35463d;
  line-height: 1.3;
  font-size: clamp(0.9rem, 1rem, 1.15rem);
  display: flex;
  justify-content: center;
  text-indent: 10%;
  border: 2px solid #eee;
`;

const ReadyToSendLoc = styled.ul`
  position: relative;
  padding: 0.5rem 0;
  width: 40%;
  margin: 0 3.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
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

const ErrWarning = styled.p`
  position: absolute;
  top: 5.5rem;
  width: 90%;
  color: brown;
  background-color: #e7e697;
  padding: 0.25rem 1rem;
  font-size: clamp(0.65rem, 0.75rem, 0.8rem);
  border: 2px solid #fff;
  display: flex;
  justify-content: center;
  text-align: center;
  transition: all 1s ease-in-out;
`;

const MsgWarning = ({ message }) => {
  return <ErrWarning>{message}</ErrWarning>;
};

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
  const { handleNewLocation } = useContext(TemplateContext);

  const [msgErr, setMsgErr] = useState("");

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
      setMsgErr("");

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
      setMsgErr("");

      //move to one more step
      /*  oneMoreStepRef.current.style.visibility = "visible"; */
      setIsMoreOneStep(true);
    } else {
      setMsgErr("Select between home and new location First !");
      setTimeout(() => {
        setMsgErr("");
      }, 5000);
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
              <Label htmlFor="phone">add Phone Number</Label>
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
                Send
              </Button>
            </SpreadLoc>
            {msgErr !== "" && <MsgWarning message={msgErr} />}
          </ReadyToSendLoc>
        </NewDirection>
      </MoreInformation>
    </NewLocation>
  );
}

export default NewLocationOrder;
