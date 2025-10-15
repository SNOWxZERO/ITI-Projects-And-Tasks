import React, { useState, useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import TestCasesTable from "./TestCasesTable";
import { TestCasesContext, TestCaseContext } from "../Context/ProblemContext";
import "../index.css";

function TestCases() {
    const testCase = useContext(TestCaseContext);
    const testCases = useContext(TestCasesContext);
    const [isErrorEmpty, setIsErrorEmpty] = useState(false);
    const [isErrorDuplicate, setIsErrorDuplicate] = useState(false);
    const [isErrorLogic, setIsErrorLogic] = useState(false);
    const handleAddTestCase = () => {
        if (testCase.testCase.input.trim() === "" || testCase.testCase.output.trim() === "") {
            setIsErrorEmpty(true);
            setIsErrorDuplicate(false);
            setIsErrorLogic(false);
            return;
        }

        const isDuplicate = testCases.testCases.some(
            (tc) => tc.input === testCase.testCase.input && tc.output === testCase.testCase.output
        );
        if (isDuplicate) {
            setIsErrorEmpty(false);
            setIsErrorDuplicate(true);
            setIsErrorLogic(false);
            return;
        }

        if (testCase.testCase.is_sample && testCase.testCase.is_hiden) {
            setIsErrorEmpty(false);
            setIsErrorDuplicate(false);
            setIsErrorLogic(true);
            return;
        }

        setIsErrorEmpty(false);
        setIsErrorDuplicate(false);
        setIsErrorLogic(false);

        testCases.setTestCases([...testCases.testCases, testCase.testCase]);
        testCase.setTestCase({
            input: "",
            output: "",
            is_sample: false,
            is_hiden: false,
        });
    };

    return (
        <>
            <Container component="main" sx={{ marginBottom: "3rem" }}>
                <CssBaseline />

                <h4 className="custom-heading">Tests</h4>

                <textarea
                    required
                    className="textArea"
                    value={testCase.testCase.input}
                    onChange={(e) => {
                        testCase.setTestCase({
                            ...testCase.testCase,
                            input: e.target.value,
                        });
                    }}
                    placeholder="InputData"
                    autoComplete="on"
                    autoFocus
                />
                <textarea
                    required
                    className="textArea"
                    value={testCase.testCase.output}
                    onChange={(e) => {
                        testCase.setTestCase({
                            ...testCase.testCase,
                            output: e.target.value,
                        });
                    }}
                    placeholder="OutputData"
                    autoComplete="on"
                    autoFocus
                />

                <FormControlLabel
                    sx={{
                        marginTop: 1.5,
                    }}
                    control={
                        <Checkbox
                            checked={testCase.testCase.is_sample}
                            onChange={(e) => {
                                testCase.setTestCase({
                                    ...testCase.testCase,
                                    is_sample: e.target.checked,
                                });
                            }}
                            color="success"
                            disabled={testCase.testCase.is_hiden}
                        />
                    }
                    label="Use as a sample"
                />
                <FormControlLabel
                    sx={{
                        marginTop: 1.5,
                    }}
                    control={
                        <Checkbox
                            checked={testCase.testCase.is_hiden}
                            onChange={(e) => {
                                testCase.setTestCase({
                                    ...testCase.testCase,
                                    is_hiden: e.target.checked,
                                });
                            }}
                            color="success"
                            disabled={testCase.testCase.is_sample}
                        />
                    }
                    label="Hidden"
                />
                {isErrorEmpty && <p className="error-message">Please enter both input and output.</p>}
                {isErrorDuplicate && <p className="error-message">Duplicate test case. Please enter a unique test case.</p>}
                {isErrorLogic && <p className="error-message">You cannot make a test case both "Use in statements" and "Hidden".</p>}
                <button className="submitBtn" onClick={handleAddTestCase}>
                    Add
                </button>
            </Container>
            <TestCasesTable />
            
        </>
    );
}

export default TestCases;