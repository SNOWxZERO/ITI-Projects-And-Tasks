import React, { useContext, useEffect, useState } from "react";
import { ProblemStatementContext } from "../Context/ProblemContext";
import {
  TextareaAutosize,
} from "@mui/material";
import Latex from "../components/Latex";
import { TabsContext } from "../Context/TabsContext";
import PreviewDialog from "../components/PreviewDialog";
import "../index.css";

interface ProblemStatementProps {
  onChange: (isFilled: boolean) => void;
}


const ProblemStatementForm: React.FC<ProblemStatementProps> = ({onChange}) => {
  const currentProblem = useContext(ProblemStatementContext);
  const activeTab = React.useContext(TabsContext);
  const [isFilled, setIsFilled] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit");
    if(isFilled){
      activeTab.setValue(2);
    }
  };

 

  useEffect(() => {
    if (currentProblem.problemStatement.legend.trim() !== "" &&
      currentProblem.problemStatement.inputRestrictions.trim() !== "" &&
      currentProblem.problemStatement.outputRestrictions.trim() !== "") {
      setIsFilled(true);
    }
    else {
      setIsFilled(false);
    }
    onChange(isFilled);
  }
    , [
      currentProblem.problemStatement.legend,
      currentProblem.problemStatement.inputRestrictions,
      currentProblem.problemStatement.outputRestrictions,
      isFilled,
    ]);

    

  return (
    <Latex>
    <form onSubmit={handleSubmit}>
      <Latex>
        <div data-color-mode="light">
          <div className="createDiv">
            <div className="startFlex">
              <p className="pW">Statement: </p>
              <div className="divGrow">
                <TextareaAutosize
                  minRows={10}
                  className="textArea"
                  placeholder="Problem Statement"
                  value={currentProblem.problemStatement.legend}
                  onChange={(e) => {  
                    currentProblem.setProblemStatement({
                      ...currentProblem.problemStatement,
                      legend: e.target.value  as string,
                    });
                  }}
                  aria-required = {false}
                />
              </div>
            </div>

            <div className="startFlex">
              <p className="pW">Input Restrictions: </p>
              <div className="divGrow">
              <TextareaAutosize
                  minRows={10}
                  className="textArea"
                  placeholder="Input Restrictions"
                  value={currentProblem.problemStatement.inputRestrictions}
                  onChange={(e) => {
                    currentProblem.setProblemStatement({
                      ...currentProblem.problemStatement,
                      inputRestrictions: e.target.value  as string,
                    });
                  }}
                  
                  aria-required = {true}
                />
              </div>
            </div>

            <div className="startFlex">
              <p className="pW">Output Restrictions: </p>
              <div className="divGrow">
              <TextareaAutosize
                  minRows={10}
                  className="textArea"
                  placeholder="Output Restrictions"
                  value={currentProblem.problemStatement.outputRestrictions}
                  onChange={(e) => {
                    currentProblem.setProblemStatement({
                      ...currentProblem.problemStatement,
                      outputRestrictions: e.target.value  as string,
                    });
                  }}
                  
                  aria-required = {true}
                />
              </div>
            </div>

            <div className="startFlex">
              <p className="pW">Notes: </p>
              <div className="divGrow">
              <TextareaAutosize
                  minRows={10}
                  className="textArea"
                  placeholder="Notes"
                  value={currentProblem.problemStatement.notes}
                  onChange={(e) => {
                    currentProblem.setProblemStatement({
                      ...currentProblem.problemStatement,
                      notes: e.target.value  as string,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Latex>
      <div className="buttonDiv">
        <button
          className="submitBtn"
          onClick={() => {
            activeTab.setValue(0);
          }}
        >
          Back
        </button>
        <button className="submitBtn" type="button" onClick={
          () => {
            setOpen(true);
          }
        }>
          Preview
        </button>
        <button className="submitBtn" type="submit">
          Next
        </button>
      </div>
      {open && <PreviewDialog open = {open} onClose={() => setOpen(false)} />}
    </form>
    </Latex>
  );
};

export default ProblemStatementForm;
