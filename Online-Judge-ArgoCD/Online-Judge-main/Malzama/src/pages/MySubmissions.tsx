import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { Box, CircularProgress } from "@mui/material";

import React, { useState, useEffect } from "react";
import problemsInstance, { submissions } from "../services/Problems";
import { useNavigate } from "react-router-dom";

const columns: GridColDef[] = [
  {
    field: "problem_name",
    headerName: "Problem",
    width: 200,
    disableColumnMenu: true,
    hideSortIcons: true,
    renderCell: (params) => {
      const navigate = useNavigate();
      const value = params.value;
      return (
        <Box
          className="clickableHover fieldSize"
          display="flex"
          alignItems="center"
          onClick={() => {
            navigate(`/problemset/problem/${params.row.problem_id}`);
          }}
        >
          {value}
        </Box>
      );
    },
  },
  {
    field: "language",
    headerName: "Language",
    width: 100,
    disableColumnMenu: true,
    hideSortIcons: true,
  },
  {
    field: "verdict",
    headerName: "Verdict",
    width: 200,
    disableColumnMenu: true,
    hideSortIcons: true,
    renderCell: (params) => {
      const value = params.value;
      const verdict = value.replace(/([A-Z])/g, " $1").trim();
      if (value === "Accepted") {
        return (
          <Box className="fieldSize" display="flex" alignItems="center">
            <div style={{ color: "green" }}>{value}</div>
          </Box>
        );
      } else if (value === "Pending") {
        return (
          <Box className="fieldSize" display="flex" alignItems="center">
            <div style={{ color: "#FFB40F" }}>{value}</div>
          </Box>
        );
      } else {
        return (
          <Box className="fieldSize" display="flex" alignItems="center">
            <div style={{ color: "red" }}>{verdict}</div>
          </Box>
        );
      }
    },
  },
  {
    field: "time_taken_in_milliseconds",
    headerName: "Time(ms)",
    width: 100,
    disableColumnMenu: true,
    hideSortIcons: true,
  },
  {
    field: "memory_taken_in_kilobytes",
    headerName: "Memory(kb)",
    width: 120,
    disableColumnMenu: true,
    hideSortIcons: true,
  },
  {
    field: "submission_date",
    headerName: "Time Submitted",
    width: 250,
    disableColumnMenu: true,
    hideSortIcons: true,
    renderCell: (params) => {
      const value = params.value;
      return (
        <Box display="flex" alignItems="center">
          {new Date(value).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </Box>
      );
    },
  },
];

export default function MySubmissions() {
  const [loading, setLoading] = useState<boolean>(true);
  const [submissions, setSubmissions] = useState<submissions[]>([]);

  useEffect(() => {
    const getSubmissions = async () => {
      const res = await problemsInstance.getSubmissions();
      setLoading(false);
      setSubmissions(res);
    };
    getSubmissions();
    const intervalId = setInterval(getSubmissions, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [loading]);

  if (loading) {
    return (
      <div className="center">
        <CircularProgress />
      </div>
    );
  }

  const style = {
    height: "calc(100vh - 120px)",
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    margin: "6rem auto",
  };
  function generateRandom() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  return (
    <div className="container">
      <Box sx={style}>
        <DataGrid
          rows={submissions}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 14,
              },
            },
            sorting: {
              sortModel: [{ field: "submission_date", sort: "desc" }],
            },
          }}
          pageSizeOptions={[14]}
          disableRowSelectionOnClick
          getRowId={(row) => generateRandom()}
        />
      </Box>
    </div>
  );
}
