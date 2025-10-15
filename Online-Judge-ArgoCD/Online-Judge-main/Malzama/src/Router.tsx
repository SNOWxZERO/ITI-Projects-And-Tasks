import { createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/Login";
import RegisterPage from "./pages/register";
import Home from "./pages/Home";
import ProblemSet from "./pages/ProblemSet";
import CreateProblem from "./pages/CreateProblem";
import ProtectedRoute from "./Routes/ProtectedRoute";
import HomeRoute from "./Routes/HomeRoute";
import Problem from "./pages/Problem";
import NavBar from "./components/NavBar";
import SubmitCode from "./pages/SubmitCode";
import SubmissionDialog from "./components/submissionDialog";
import MySubmissions from "./pages/MySubmissions";
import NotFoundPage from "./pages/PageNotFound";

const router = createBrowserRouter([
  {
    element: <SubmissionDialog />,
    children: [
      {
        element: <NavBar />,
        children: [
          {
            path: "/",
            element: <Home />,
          },

          

          {
            element: <ProtectedRoute />,
            children: [
              {
                path: "/createproblem",
                element: <CreateProblem />,
              },
              {
                path: "/problemset",
                element: <ProblemSet />,
                children: [],
              },
              {
                path: "/problemset/problem/:id",
                element: <Problem />,
              },
    
              {
                path: "/problemset/submit/:name/:id",
                element: <SubmitCode />,
              },
              {
                path: "*", // Catch-all route for not found pages
                element: <NotFoundPage />,
              },

              {
                path:"/mysubmissions",
                element:<MySubmissions/>
              }
            ],
          },
          {
            element: <HomeRoute />,
            children: [
              {
                path: "/signin",
                element: <SignIn />,
              },
              {
                path: "/register",
                element: <RegisterPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
