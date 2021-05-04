import { Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { useMeQuery } from "../generated/graphql";
import { Directories } from "./Directories/Directories";

// import { defaultDirectories } from "../data/data";
import { useData } from "../Providers/DataProvider";
import { Folder } from "../types";

export const Sidebar = () => {
  const { data: meData, loading } = useMeQuery();
  const { userData, userDataLoading } = useData();
  const [directories, setDirectories] = useState<Folder[]>([]);

  useEffect(() => {
    if (!userDataLoading && userData) {
      setDirectories(JSON.parse(userData));
    }
  }, [userData, userDataLoading]);

  let authUser: Boolean = !loading && !!meData?.me;

  return (
    <Flex w="300px" bgColor="gray.700" h="100vh" direction="column">
      {authUser && (
        <Directories
          subDirectories={directories}
          topLevelDirectories={directories}
          depth={0}
          setDirectories={setDirectories}
        />
      )}
    </Flex>
  );
};
