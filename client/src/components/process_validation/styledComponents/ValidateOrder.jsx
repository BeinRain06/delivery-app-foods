import react, { useState } from "react";
import styled from "styled-components";

// styled-components
const ValidateMsg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const ValidateMsgContent = styled.div`
position:relative;
width:80%
height:auto;
padding: 1rem 0;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center`;

const Validation = styled.p`
  font-weight: bolder;
  font-size: clamp(0.89rem, 0.92rem, 1rem);
`;
const BtnValidation = styled.div`
  width: 100%;
  padding: 0.25em 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: ${(props) => (props.$primary ? "#1c7e4d" : "#d4cfcf")};
  color: ${(props) => (props.$primary ? "#fff" : "#333")};
  border: ${(props) => (props.$primary ? "2px solid #fff" : "2px solid gray")};
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;

/* function ValidateOrder() {
  
  return (
    <div className="wrap_validate_msg">
      <div className="validate_msg_content">
        <p className="msg_validation">Do You Confirm The Order</p>
        <div className="space_btn_validation">
          <button type="button" className="accept_validation">
            YES
          </button>
          <button type="button" className="close_validation">
            NO
          </button>
        </div>
      </div>
    </div>
  );
} */

function ValidateOrder({ setOpenFinalValidation, setApplyText }) {
  const setOrder = () => {
    // do something
    setOpenFinalValidation(false);
    setApplyText("Minimize");
  };

  const cancelOrder = () => {
    // do something
    setOpenFinalValidation(false);
  };
  return (
    <ValidateMsg>
      <ValidateMsgContent>
        <Validation>Do You Confirm The Order .</Validation>
        <BtnValidation>
          <Button $primary onClick={setOrder}>
            YES
          </Button>
          <Button onClick={cancelOrder}>NO</Button>
        </BtnValidation>
      </ValidateMsgContent>
    </ValidateMsg>
  );
}

export default ValidateOrder;
