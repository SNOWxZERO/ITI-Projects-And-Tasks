import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useContext, useState } from "react";
import { dialogContext } from "../Context/ProblemContext";
import { Outlet } from "react-router-dom";
import "../index.css";

function SubmissionDialog() {
  const dialog = useContext(dialogContext);

  const handleClose = () => {
    dialog.setDialog({
      open: false,
      result: {
        verdict: "",
        time: 0,
        memory: 0,
      },
    });
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="xs"
        open={dialog.dialog.open}
        onClose={handleClose}
        sx={{ fontFamily: "" }}
      >
        <DialogTitle sx={{ fontFamily: "monospace" }}>
          Submission Result
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ fontFamily: "monospace", textAlign: "center" }}
          >
            <span
              className={
                dialog.dialog.result.verdict === "Accepted" ? "green" : "red"
              }
            >
              {dialog.dialog.result.verdict}
            </span>
            <br />
            Time: {dialog.dialog.result.time} MS
            <br />
            Memory: {dialog.dialog.result.memory} KB
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="submitBtn" onClick={handleClose}>
            Close
          </button>
        </DialogActions>
      </Dialog>
      <Outlet />
    </div>
  );
}

export default SubmissionDialog;
