import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Login from "./pages/login/login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import ProjectDetails from "./pages/ProjectDetails/projectDetails.jsx";

function App() {
  const { currentUser, loading } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  // 👇 Wait for context to finish loading
  if (loading) return <div>Loading...</div>;

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/project/:projectId",
      element: (
        <ProtectedRoute>
          <ProjectDetails />
        </ProtectedRoute>
      ),
    },
    {
      path: "/",
      element: <Navigate to="/dashboard" />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );


  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
  //   const ProtectedRoute = ({ children }) => {
  //   if (!currentUser) {
  //     return <Navigate to="/login" />;
  //   }
  //      return children;
  // };
}

export default App;
