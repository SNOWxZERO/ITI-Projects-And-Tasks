import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import Latex from "../components/Latex";
import Stack from "@mui/material/Stack";
import { ToastContainer, toast } from "react-toastify";
import problemsInstance, {
  ProblemResponse,
  TagMap,
} from "../services/Problems";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../index.css";

interface ProblemStatement {
  legend: string;
  inputRestrictions: string;
  outputRestrictions: string;
  notes: string;
}
interface TestCase {
  input: string;
  output: string;
}

export default function Problem() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [problem, setProblem] = useState<ProblemResponse>(
    {} as ProblemResponse
  );
  const [problemStatement, setProblemStatement] = useState<ProblemStatement>({
    legend: "",
    inputRestrictions: "",
    outputRestrictions: "",
    notes: "",
  });
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [tagMap, setTagMap] = useState<TagMap>({});
  useEffect(() => {
    const fetchTags = async () => {
      const tags = await problemsInstance.getTags();
      setTagMap(tags);
    };
    fetchTags();
  }, []);
  const navigate = useNavigate();

  const copyUserInput = async (input: string) => {
    try {
      await navigator.clipboard.writeText(input);
      toast.success("Input Copied successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something wrong happened");
    }
  };

  React.useEffect(() => {
    const getProblem = async () => {
      try {
        const response = await problemsInstance.getProblem(Number(id));
        if (response.response_code === "10") {
          console.log(response);
          setProblem(response);
          setTestCases(response.test_cases);
          console.log(testCases);
          const problemStatement = response.problem_statement;
          const parts = problemStatement.split("$#*%");
          const legend = parts[0];
          const inputRestrictions = parts[1];
          const outputRestrictions = parts[2];
          const notes = parts[3];
          setProblemStatement({
            legend,
            inputRestrictions,
            outputRestrictions,
            notes,
          });
        } else {
          throw new Error(response.response_description);
        }
        console.log(problemStatement);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getProblem();
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container">
        <Latex>
          <div data-color-mode="light">
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-around",
                justifyItems: "center",
                margin: "auto",
                marginTop: "5rem",
              }}
            >
              <div className="problemStatement" style={{ flexGrow: "3" }}>
                <h2 className="name">{problem.name}</h2>
                <p className="limits">
                  Time Limit Per Test: {problem.time_limit_in_milliseconds} MS
                </p>
                <p className="limits">
                  Memory Limit Per Test: {problem.memory_limit_in_kilobytes} KB
                </p>
                <Stack spacing={3} sx={{  marginTop: "2rem" }}>
                  <div className="legend mdeStyle">
                    <MDEditor.Markdown source={problemStatement.legend} />
                  </div>
                  <div className="input mdeStyle">
                    <h5>Input</h5>
                    <MDEditor.Markdown
                      source={problemStatement.inputRestrictions}
                    />
                  </div>
                  <div className="output mdeStyle">
                    <h5>Output</h5>
                    <MDEditor.Markdown
                      source={problemStatement.outputRestrictions}
                    />
                  </div>

                  <h5>Examples</h5>
                  {testCases.map((testCase, index) => {
                    return (
                      <div className="testCases">
                        <div>
                          <h6>Input {index + 1}</h6>
                          <p className="sample">
                            {testCase.input}
                            <button
                              className="copyButton"
                              onClick={() => copyUserInput(testCase.input)}
                            >
                              Copy Input
                            </button>
                          </p>
                        </div>
                        <div className="sampleOutput">
                          <h6>Output {index + 1}</h6>
                          <p className="sample">{testCase.output}</p>
                        </div>
                      </div>
                    );
                  })}
                  <div className="notes mdeStyle">
                    <h5>Notes</h5>
                    <MDEditor.Markdown source={problemStatement.notes} />
                  </div>
                </Stack>
                <div className="submit">
                  <button
                    className="submitBtn"
                    onClick={() =>
                      navigate(`/problemset/submit/${problem.name}/${id}`)
                    }
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div className="tags accColor" >
                <Accordion className="accColor" style={{ width: "300px"}}>
                  <AccordionSummary
                    className="accColor"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                      backgroundColor: '#E7EEEF', 
                      
                    }}
                  >
                    <h6>Related Topics</h6>
                  </AccordionSummary>
                  <AccordionDetails className="accColor">
                    <div className="tagsDiv">
                      {problem.tags.map((tag) => {
                        return (
                          <div className="tag">
                            <p className="tagName">{tagMap[tag]}</p>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Box>
          </div>
        </Latex>
        <ToastContainer />
      </div>
    </>
  );
}
