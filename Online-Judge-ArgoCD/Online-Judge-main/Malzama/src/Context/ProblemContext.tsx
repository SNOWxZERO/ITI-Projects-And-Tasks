// create a problem context

import React, { createContext, useContext, useState } from "react";
import { NumberSchema } from "yup";

type GeneralInfoType = {
  name: string;
  difficulty: string;
  timeLimit: number;
  memoryLimit: number;
  selectedTags: number[];
};
type ProblemStatementType = {
  legend: string;
  inputRestrictions: string;
  outputRestrictions: string;
  notes: string;
};

export type TestCaseType = {
  input: string;
  output: string;
  is_sample: boolean;
  is_hiden: boolean;
};

type TestCasesType = TestCaseType[];


type resultType = {
  verdict: string;
  time: number;
  memory: number;
};

type dialogType = {
  open: boolean;
  result: resultType;
};

type GeneralInfoContextType = {
  generalInfo: GeneralInfoType;
  setGeneralInfo: React.Dispatch<React.SetStateAction<GeneralInfoType>>;
};

type ProblemStatementContextType = {
  problemStatement: ProblemStatementType;
  setProblemStatement: React.Dispatch<
    React.SetStateAction<ProblemStatementType>
  >;
};

type TestCaseContextType = {
  testCase: TestCaseType;
  setTestCase: React.Dispatch<React.SetStateAction<TestCaseType>>;
};

type TestCasesContextType = {
  testCases: TestCasesType;
  setTestCases: React.Dispatch<React.SetStateAction<TestCasesType>>;
};



type dialogContextType = {
  dialog: dialogType;
  setDialog: React.Dispatch<React.SetStateAction<dialogType>>;
};

export const GeneralInfoContext = createContext<GeneralInfoContextType>({
  generalInfo: {
    name: "",
    difficulty: "",
    timeLimit: 0,
    memoryLimit: 0,
    selectedTags: [],
  },
  setGeneralInfo: () => {},
});

export const ProblemStatementContext =
  createContext<ProblemStatementContextType>({
    problemStatement: {
      legend: "",
      inputRestrictions: "",
      outputRestrictions: "",
      notes: "",
    },
    setProblemStatement: () => {},
  });

export const TestCaseContext = createContext<TestCaseContextType>({
  testCase: {
    input: "",
    output: "",
    is_sample: false,
    is_hiden: false,
  },
  setTestCase: () => {},
});

export const TestCasesContext = createContext<TestCasesContextType>({
  testCases: [],
  setTestCases: () => {},
});



export const dialogContext = createContext<dialogContextType>({
  dialog: {
    open: false,
    result: {
      verdict: "",
      time: 0,
      memory: 0,
    },
  },
  setDialog: () => {},
});


export default function ProblemProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [generalInfo, setGeneralInfo] = useState<GeneralInfoType>({
    name: "",
    difficulty: "",
    timeLimit: 0,
    memoryLimit: 0,
    selectedTags: [],
  });

  const [problemStatement, setProblemStatement] =
    useState<ProblemStatementType>({
      legend: "",
      inputRestrictions: "",
      outputRestrictions: "",
      notes: "",
    });

  const [testCase, setTestCase] = useState<TestCaseType>({
    input: "",
    output: "",
    is_sample: false,
    is_hiden: false,
  });


  const [testCases, setTestCases] = useState<TestCasesType>([]);



  const [dialog, setDialog] = useState<dialogType>({
    open: false,
    result: {
      verdict: "",
      time: 0,
      memory: 0,
    },
  });


  return (
    <GeneralInfoContext.Provider value={{ generalInfo, setGeneralInfo }}>
      <ProblemStatementContext.Provider value={{ problemStatement, setProblemStatement }}>
        <TestCaseContext.Provider value={{ testCase, setTestCase }}>
        <TestCasesContext.Provider value={{ testCases, setTestCases }}>
          <dialogContext.Provider value={{ dialog, setDialog }}>
            {children}
          </dialogContext.Provider>
        </TestCasesContext.Provider>
        </TestCaseContext.Provider>
      </ProblemStatementContext.Provider>
    </GeneralInfoContext.Provider>
  );
}
