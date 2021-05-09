import { Flex } from "@chakra-ui/layout";
import { BrowserRouter as Router } from "react-router-dom";

import { NavBar } from "./components/NavBar";
import { Sidebar } from "./components/SideBar";
import { AuthProvider } from "./Providers/AuthProvider";
import { Routes } from "./Routes";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Flex w="100%">
          <Sidebar />
          <Routes />
        </Flex>
      </Router>
    </AuthProvider>
  );
}

export default App;
