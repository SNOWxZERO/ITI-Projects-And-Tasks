import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useContext, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import "../index.css";
import { Outlet } from "react-router-dom";
import { ProblemStatementContext } from "../Context/ProblemContext";
import Latex from "../components/Latex";
import "../index.css";

interface PreviewDialogProps {
  open: boolean;
  onClose: () => void;
}

function PreviewDialog(props: PreviewDialogProps) {
  const [open, setOpen] = useState(props.open);
  const problemStatement = useContext(ProblemStatementContext);

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="xl"
        open={open}
        onClose={props.onClose}
        sx={{
          fontFamily: "",
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "monospace",
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          Problem Statement Preview
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center" }}></DialogContentText>
          <Latex>
            <div className="container">
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
                    <Stack spacing={3} sx={{ marginTop: "2rem" }}>
                      <h5 className="custom-heading2">Statement</h5>
                      <div className="legend mdeStyle">
                        <MDEditor.Markdown
                          source={problemStatement.problemStatement.legend}
                        />
                      </div>
                      <div className="input mdeStyle">
                        <h5 className="custom-heading2">Input</h5>
                        <MDEditor.Markdown
                          source={
                            problemStatement.problemStatement.inputRestrictions
                          }
                        />
                      </div>
                      <div className="output mdeStyle">
                        <h5 className="custom-heading2">Output</h5>
                        <MDEditor.Markdown
                          source={
                            problemStatement.problemStatement.outputRestrictions
                          }
                        />
                      </div>
                      <div className="notes mdeStyle">
                        <h5 className="custom-heading2">Notes</h5>
                        <MDEditor.Markdown
                          source={problemStatement.problemStatement.notes}
                        />
                      </div>
                    </Stack>
                  </div>
                </Box>
              </div>
            </div>
          </Latex>
        </DialogContent>
        <DialogActions>
          <button className="submitBtn" onClick={props.onClose}>
            Close
          </button>
        </DialogActions>
      </Dialog>

      <Outlet />
    </>
  );
}

export default PreviewDialog;
