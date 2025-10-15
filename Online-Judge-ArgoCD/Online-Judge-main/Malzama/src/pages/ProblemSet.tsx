import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import problemsInstance, { problem, submissions } from "../services/Problems";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "../index.css";
import { CircularProgress } from "@mui/material";

const tagMap = await problemsInstance.getTags();

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 250,
    editable: false,
    renderCell: (params) => {
      const navigate = useNavigate();
      const value = params.value;
      return (
        <Box
          className="clickableHover fieldSize"
          display="flex"
          alignItems="center"
          onClick={() => {
            navigate(`/problemset/problem/${params.row.id}`);
          }}
        >
          {value}
        </Box>
      );
    },
  },
  {
    field: "tags",
    type: "string",
    headerName: "Tags",
    width: 300,
    editable: false,
    valueGetter: (params) => {
      const tagsId = params.value as number[];
      return tagsId.map((tagId) => tagMap[tagId]);
    },
    renderCell: (params) => {
      const tags = params.value as string[];
      return (
        <Box className="fieldSize" display="flex" alignItems="center">
          {tags.join(", ")}
        </Box>
      );
    }
    
  },
  {
    field: "difficulty",
    headerName: "Difficulty",
    width: 200,
    renderCell: (params) => {
      const value = params.value;
      return (
        <Box display="flex" alignItems="center">
          <Rating
            name="difficulty"
            value={value}
            precision={1}
            max={7}
            icon={<StarIcon fontSize="inherit" sx={{
              color: "#FFB40F"
            }} />}
            readOnly
          />
          <Box ml={10}>{value} </Box>
        </Box>
      );
    },
  },
  {
    field: "solved",
    headerName: "",
    width: 20,
    disableColumnMenu: true,
    hideSortIcons: true,
    sortable: false,
    renderCell: (params) => {
      const [loading, setLoading] = useState(true);
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
      const accepted = (submissions: submissions[]) => {
        const accepted = submissions.filter(
          (submission) =>
            submission.problem_id === params.row.id &&
            submission.verdict === "Accepted"
        );
        return accepted.length > 0;
      };
      if (loading) {
        return (
          <Box display="flex" alignItems="center">
            <CircularProgress />
          </Box>
        );
      }
      if (accepted(submissions)) {
        return (
          <Box display="flex" alignItems="center">
            <div style={{ color: "green" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="green"
                className="bi bi-check"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M5.646 11.854a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1
                  .708-.708L5 10.293l7.646-7.647a.5.5 0 0
                  1 .708.708l-8 8z"
                />
              </svg>
            </div>
          </Box>
        );
      } 
    }
  }
];

export default function ProblemSet() {
  const [rowCount, setRowCount] = useState(1);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 14,
  });
  const [rows, setRows] = useState<problem[]>([]);

  useEffect(() => {
    const getProblems = async () => {
      try {
        const data = await problemsInstance.getProblemList(
          paginationModel.page * paginationModel.pageSize,
          paginationModel.pageSize
        );
        console.log(data.problems);
        setRows(data.problems);
        setRowCount(data.total_count);
        if (data.response_code === "5") {
          throw new Error(data.response_description);
        }
      } catch (error) {
        toast.error(String(error));
      }
    };
    getProblems();
  }, [paginationModel]);

  const [rowCountState, setRowCountState] = useState(rowCount);
  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      rowCount !== undefined ? rowCount : prevRowCountState
    );
  }, [rowCount, setRowCountState]);

  const style = {
    height: "calc(114vh - 10px)",
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    margin: "6rem auto",
  };

  return (
    <div className="container">
      <Box sx={style}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowCount={rowCountState}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[14]}
          disableRowSelectionOnClick
        />
      </Box>
      <ToastContainer />
      <Outlet />
    </div>
  );
}
