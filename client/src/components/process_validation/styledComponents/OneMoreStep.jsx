import React from "react";
import styled from "styled-components";

const MoreStep = styled.div`
position:absolute;
top:50%;
left:50%;
transform:translate(-50%, -50%);
width:100%;
height100%;
margin: 0 auto;`;

const MoreContent = styled.div`
  position: relative;
  padding: 0.25em 1em;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
`;

const FirstMyWord = styled.div`
  width: 100%;
  margin: 0.5em 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
`;
const RemindNext = styled.span`
  font-size: clamp(0.72rem, 0.82rem, 1rem);
`;
const SmallTask = styled.p`
  width: 100%;
  font-size: clamp(0.72rem, 0.84rem, 1rem);
`;

const Validation = styled.span`
  padding: 0.25em 0.5em;
  background-color: #1c7e4d;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 5px;
`;

const Strong = styled.strong``;

const Decision = styled.ul`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Proposal = styled.li`
  width: 60px;
  height: 50px;
  border-radius: 5px;
  margin: 0 auto;
`;

const Button = styled.button`
  background-color: ${(props) => (props.$primary ? "#1c7e4d" : "#d4cfcf")};
  color: ${(props) => (props.$primary ? "#fff" : "#333")};
  border: ${(props) => (props.$primary ? "2px solid #fff" : "2px solid gray")};
  width: 100%;
  height: 100%;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const Span = styled.span``;

const ChevronLeft = styled.i``;

function OneMoreStep() {
  return (
    <MoreStep>
      <MoreContent>
        <FirstMyWord>
          <RemindNext>One more step:</RemindNext>
          <SmallTask>
            click on the button <Validation>validate</Validation> Please to
            terminate the process of sending your <Strong>order</Strong>
          </SmallTask>
        </FirstMyWord>
        <Decision>
          <Proposal>
            <Button onClick={handleStepBackLoc}>
              <Span>
                <ChevronLeft className="fa-solid fa-chevron-left fa-2x" />
                <ChevronLeft className="fa-solid fa-chevron-left fa-2x" />
              </Span>
              <Span>Back</Span>
            </Button>
          </Proposal>
          <Proposal>
            <Button $primary onClick={handleMoveToValidation}>
              OK
            </Button>
          </Proposal>
        </Decision>
      </MoreContent>
    </MoreStep>
  );
}

/* function OneMoreStep() {
  const oneMoreStepRef = useRef(null);

  const handleStepBackLoc = () => {
    oneMoreStepRef.current.style.visibility = "hidden";
    handleNewLocation(true);
    validateRef.current.style.classList.remove("impact_more_step");
  };

  const handleMoveToValidation = () => {
    oneMoreStepRef.current.style.visibility = "hidden";
    validateRef.current.style.classList.add("impact_more_step");

    handleTicketNumber((totalPrice - 3).toString(16));
    handleHoursPrint(moment().format("hh:mm a"));
    handleTimer("02:00:00");
  };

  return (
    <div className="one_more_step">
      <div className="one_more_content" ref={oneMoreStepRef}>
        <div className="first_my_word">
          <span className="remind_next">One more step:</span>
          <p className="small_task">
            click on the Button
            <span className="remind_validation">validate</span>
            Please, to terminate the process of sending your
            <strong>order</strong>
          </p>
        </div>
        <ul className="process_decision">
          <li className="back_my_need">
            <button
              type="button"
              className="no_mind"
              onClick={handleStepBackLoc}
            >
              <span className="drop_">
                <i className="fa-solid fa-chevron-left fa-2x"></i>
                <i className="fa-solid fa-chevron-left fa-2x"></i>
              </span>
              <span> Back</span>
            </button>
          </li>
          <li className="agree_your_proposal">
            <button
              type="button"
              className="yes_sure"
              onClick={handleMoveToValidation}
            >
              OK
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
} */

export default OneMoreStep;
