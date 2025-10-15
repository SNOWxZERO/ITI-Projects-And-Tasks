import React, { useState } from "react";
import { Tabs, Button, Container, Paper, Tab } from "@mui/material";
import GeneralInfoForm from "../components/GeneralInfo";
import ProblemStatementForm from "../components/ProblemStatement";
import TestCases from "../components/TestCases";
import { useNavigate } from "react-router-dom";
import "../index.css";
import {
  GeneralInfoContext,
  ProblemStatementContext,
  TestCasesContext,
} from "../Context/ProblemContext";
import problemsInstance from "../services/Problems";
import { TabsContext } from "../Context/TabsContext";
import { ToastContainer, toast } from "react-toastify";


const CreateProblem = () => {
  const activeTab = React.useContext(TabsContext);
  const generalInfo = React.useContext(GeneralInfoContext);
  const problemStatement = React.useContext(ProblemStatementContext);
  const testCases = React.useContext(TestCasesContext);
  const [isGeneralInfoFilled, setIsGeneralInfoFilled] = useState(false);
  const [isProblemStatementFilled, setIsProblemStatementFilled] =
    useState(false);


  const concatProblemStatement =
    problemStatement.problemStatement.legend +
    "$#*%" +
    problemStatement.problemStatement.inputRestrictions +
    "$#*%" +
    problemStatement.problemStatement.outputRestrictions +
    "$#*%" +
    problemStatement.problemStatement.notes;

  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    activeTab.setValue(newTab);
  };
  const navigate = useNavigate();

  const handlesubmit = () => {
    if (
      generalInfo.generalInfo.name.trim() === "" ||
      generalInfo.generalInfo.difficulty.trim() === "" ||
      generalInfo.generalInfo.selectedTags.length === 0 ||
      generalInfo.generalInfo.timeLimit === 0 ||
      generalInfo.generalInfo.memoryLimit === 0 ||
      concatProblemStatement.trim() === "" ||
      testCases.testCases.length === 0
    ) {
      toast.error("Please fill all the fields before creating");
      return;
    }
    problemsInstance
      .createProblem(
        generalInfo.generalInfo.name,
        generalInfo.generalInfo.difficulty,
        generalInfo.generalInfo.selectedTags,
        generalInfo.generalInfo.timeLimit,
        generalInfo.generalInfo.memoryLimit,
        concatProblemStatement,
        testCases.testCases
      )
      .then((response) => {
        console.log(response);
        if(response.response_code === '7'){
          toast.error(response.response_description);
        }
        else{
          toast.success(response.response_description);
          setTimeout(() => {
            navigate("/problemSet");
          }, 1000);
          activeTab.setValue(0);
          generalInfo.setGeneralInfo({
            name: "",
            difficulty: "",
            selectedTags: [],
            timeLimit: 0,
            memoryLimit: 0,
          });
          problemStatement.setProblemStatement({
            legend: "",
            inputRestrictions: "",
            outputRestrictions: "",
            notes: "",
          });
          testCases.setTestCases([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGeneralInfoChange = (isFilled: boolean) => {
    setIsGeneralInfoFilled(isFilled);
  };
  const handleProblemStatementChange = (isFilled: boolean) => {
    setIsProblemStatementFilled(isFilled);
  };

  return (
    <div className="containerDiv" style ={{
     paddingBottom: "20rem",
    }}>
      <Tabs
        value={activeTab.value}
        onChange={handleTabChange}
        centered
        textColor="inherit"
        TabIndicatorProps={{
          style: { backgroundColor: "#005216", height: "0.21rem" },
        }}
      >
        <Tab label="General Info" />
        <Tab label="Problem Statement" disabled={!isGeneralInfoFilled} />
        <Tab
          label="Test Cases"
          disabled={!isGeneralInfoFilled || !isProblemStatementFilled}
        />
      </Tabs>
      {activeTab.value === 0 && (
        <GeneralInfoForm onChange={handleGeneralInfoChange} />
      )}
      {activeTab.value === 1 && (
        <ProblemStatementForm onChange={handleProblemStatementChange} />
      )}
      {activeTab.value === 2 && <TestCases />}

      {activeTab.value === 2 && (
        <div className="buttonDiv">
          <button
            className="submitBtn"
            onClick={() => {
              activeTab.setValue(1);
            }}
          >
            Back
          </button>
          <button className="submitBtn" onClick={handlesubmit}>
            Create
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default CreateProblem;
