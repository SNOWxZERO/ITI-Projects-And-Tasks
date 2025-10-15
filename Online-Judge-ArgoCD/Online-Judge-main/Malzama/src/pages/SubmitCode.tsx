import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import {
  Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import Editor, { loader } from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import "../index.css";
import problemsInstance, {submissionResponse} from "../services/Problems";
import { useContext } from "react";
import { dialogContext } from "../Context/ProblemContext";
import { ToastContainer, toast } from "react-toastify";
import "../index.css";

interface LanguageOption {
  value: string;
  label: string;
  language: string;
}


const languageOptions: LanguageOption[] = [
  { value: "python", label: "Python", language: "python" },
  { value: "java", label: "Java", language: "java" },
  { value: "c", label: "C", language: "cpp" },
  { value: "cpp", label: "C++", language: "cpp" },
];

const optionMapping: { [key: string]: number } = {
  c: 0,
  cpp: 1,
  java: 2,
  python: 3,
};

function SubmitCode() {
  const cookies = new Cookies();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [languageValue, setLanguageValue] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    setLanguageValue(optionMapping[language]);
  }, [language]);

  console.log(languageValue);

  const { name } = useParams<{ name: string }>();
  const { id } = useParams<{ id: string }>();

  const [problemId, setProblemId] = useState<number>(0);
  useEffect(() => {
    setProblemId(Number(id));
  }, [id]);

  const dialog = useContext(dialogContext);


  const editorRef = useRef<any>(null);

  useEffect(() => {
    loader.init().then();
  }, []);

  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode) {
      setCode(newCode);
    }
  };
  const handleCodeSubmit = (event: React.FormEvent<HTMLFormElement> ) => { 
    event.preventDefault();
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      if(code.trim() === ""){
        toast.error("Put your source into the textarea");
        return;
      }
      problemsInstance
        .submitCode(problemId,cookies.get("Username"), code, languageValue)
        .then((res) => {
          dialog.setDialog({ open: true, result: {
            verdict: res.verdict,
            time: res.time_taken_in_milliseconds,
            memory: res.memory_taken_in_kilobytes,
          } });
        }).catch((err) => {
          toast.error(err.message);
        });
        toast.success("Code Submitted Successfully, Waiting for Verdict!, Redirecting to My Submissions...");
        setTimeout(() => {
        navigate("/mysubmissions");
        }, 2000);

    }
  };

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="container">
      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        spacing={2}
        style={{ padding: "20px" }}
      >
        <Grid item xs={12}>
          <h4>
            Submit Your Code
          </h4>
        </Grid>
        <Grid item xs={12} sx={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          display: "inline-block",
          marginRight: "10px",

        }}>
          <Typography variant="h5" gutterBottom>
            Problem Name <p className="colouredParagraph">{name}</p>
          </Typography>
        </Grid>
        <form className="submitForm" onSubmit={handleCodeSubmit}>
        <Grid item xs={12}>
          
          <FormControl style={{ minWidth: 300, marginBottom: 10 }}>
            <InputLabel htmlFor="code-language">Choose Language</InputLabel>
            <Select
              id="code-language"
              value={language}
              onChange={handleLanguageChange}
              required
              
            >
              {languageOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
        </Grid>
        <div className="editor">
          <Editor
            height="50vh"
            language={
              languageOptions.find((option) => option.value === language)
                ?.language
            }
            theme="vs-white"
            value={code}
            onChange={handleCodeChange}
            onMount={(editor) => {
              editorRef.current = editor;
            }}
          />
        </div>
        <Grid item xs={12}>
          <button className="submitBtn" type="submit" >
            Submit
          </button>
        </Grid>
        </form>
      </Grid>
      <ToastContainer />
    </div>
  );
}

export default SubmitCode;
