import { Flex } from "@chakra-ui/layout";
import { BrowserRouter as Router } from "react-router-dom";

import { NavBar } from "./components/NavBar";
import { Sidebar } from "./components/SideBar";
import { AuthProvider } from "./Providers/AuthProvider";
import { DataProvider } from "./Providers/DataProvider";
import { Routes } from "./Routes";

function App() {
  return (
    <AuthProvider>
      {/* <DataProvider> */}
      <Router>
        <NavBar />
        <Flex w="100%">
          <Sidebar />
          <Routes />
        </Flex>
      </Router>
      {/* </DataProvider> */}
    </AuthProvider>
  );
}

export default App;
