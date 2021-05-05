import { Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { options } from "../components/Directories/utils";
// import { useData } from "../Providers/DataProvider";
import { Folder, File } from "../types";
import { Checklist } from "./Checklist";
import { v4 as uuid } from "uuid";
import {
  UserDataDocument,
  UserDataQuery,
  useSetDataMutation,
  useUserDataQuery,
} from "../generated/graphql";

// const htmlparser2 = require("htmlparser2");
interface EditPageProps {}

export const EditPage: React.FC<EditPageProps> = () => {
  const { state } = useLocation<{ file: File; folder: Folder }>();
  const { data: userData, loading: useDataLoading } = useUserDataQuery();

  const [setData] = useSetDataMutation();

  const [text, setText] = useState(state.file.xml);
  const [title, setTitle] = useState(state.file.title);
  const [order, setOrder] = useState(state.file.order);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(parseInt(e.target.value));
  };

  useEffect(() => {
    let { order, title, xml } = state.file;
    setText(xml);
    setOrder(order + 1);
    setTitle(title);
  }, [state]);

  let optArr = options(order);

  const handleSave = async () => {
    let newChecklist = {
      id: uuid(),
      title,
      order,
      xml: text,
      folderId: state.folder.id,
    };

    if (userData) {
      console.log(
        "EditPage.tsx 55 userData:",
        JSON.parse(userData.userData!.directories)
      );
      console.log("EditPage.tsx 56 state:", state);

      const { directories, id } = userData.userData!;

      const oldDirectories = JSON.parse(directories);
      let newData = {
        __typeName: "Data",
        id,
        directories: JSON.stringify(oldDirectories),
      };

      const addFile = (directories: Folder[], newFile: File) => {
        directories.forEach((directory) => {
          if (directory.id === state.folder.id) {
            directory.contents.files.push(newFile);
            console.log("Found folder");
            return;
          } else if (directory.contents.folders.length > 0) {
            addFile(directory.contents.folders, newFile);
          }
          return;
        });
      };

      addFile(oldDirectories, newChecklist);

      console.log("EditPage.tsx 73 oldDirectories:", oldDirectories);

      const res = await setData({
        variables: { directories: JSON.stringify(oldDirectories) },
        update: (cache, { data }) => {
          console.log(
            "EditPage.tsx 94 inside write cache :",
            JSON.parse(data!.setData.directories)
          );
          cache.writeQuery<UserDataQuery>({
            query: UserDataDocument,
            data: {
              userData: {
                ...newData,
                directories: JSON.stringify(oldDirectories),
              },
            },
          });
        },
      });
      console.log(
        "EditPage.tsx 74 res:",
        JSON.parse(res.data!.setData!.directories)
      );

      // if (handleAddFile) {
      //   handleAddFile(title, text, order, state.folder);
      //   console.log("saving: ", newChecklist);
      // }
    }
  };

  return (
    <Flex w="100%" p={1} mt={2}>
      <Flex flex={1} direction="column">
        <Flex direction="row" w="100%" justifyContent="space-between">
          <Input
            w="75%"
            value={title}
            onChange={handleTitleChange}
            placeholder="Checklist Title: "
            size="sm"
          />
          {/* <Input
            w="20%"
            value={order}
            onChange={handleOrderChange}
            placeholder="Order "
            size="sm"
            type="number"
          /> */}
          <Select w="20%" value={order - 1} onChange={handleOrderChange}>
            {optArr.map((option) => option)}
          </Select>
        </Flex>

        <Textarea
          fontSize="12px"
          size="lg"
          mt={4}
          h={80}
          placeholder="Copy Text Here."
          onChange={handleChange}
          value={text}
        />
        <Button my={2} mx="auto" w="90%" size="sm" onClick={handleSave}>
          Save
        </Button>
        <Text mt={4}>Example:</Text>
        <Text fontSize="12px" as="pre" px={2}>
          {`
<ChecklistTitle>Configuration Safety Checklist</ChecklistTitle>

<ChecklistItem><Item>SLAT/FLAP lever</Item><Action>
    In agreement with actual Slat/Flap position
  </Action>
</ChecklistItem>

<ChecklistItem ffod="true">
  <Item>PARK BRAKE</Item>
  <Action>ON</Action>
</ChecklistItem>

<ChecklistItem fullRow="true"><Item>Once DU 2 is Powered</Item></ChecklistItem>

<ChecklistItem done="true">
  <Item>BATT 1</Item>
  <Action>AUTO</Action>
</ChecklistItem>
`}
        </Text>
      </Flex>
      <Flex flex={1} p={2}>
        <Checklist xml={`<checklist>${text}</checklist>`} />
      </Flex>
    </Flex>
  );
};

// const NoteTitle: React.FC<{}> = ({ children }) => {
//   return <Heading>{children}</Heading>;
// };

// const NoteText: React.FC<{}> = ({ children }) => {
//   return <Text>{children}</Text>;
// };

// const Note: React.FC<{}> = ({ children }) => {
//   console.log(children);
//   return (
//     <Box w="100%" bgColor="blue.300">
//       {children}
//     </Box>
//   );
// };

/* 
<ChecklistTitle>Configuration Safety Checklist</ChecklistTitle>
<ChecklistItem><Item>SLAT/FLAP lever</Item><Action>
    In agreement with actual Slat/Flap position
  </Action>
  </ChecklistItem>

<ChecklistItem ffod="true">
  <Item>PARK BRAKE</Item>
  <Action>ON</Action>
</ChecklistItem>
<ChecklistItem>
  <Item>BATT 1</Item>
  <Action>AUTO</Action>
</ChecklistItem>
<ChecklistItem>
  <Item>BATT 2</Item>
  <Action>AUTO</Action>
</ChecklistItem>
<ChecklistItem fullRow="true"><Item>Once DU 2 is Powered</Item></ChecklistItem>
<ChecklistItem>
  <Item>ECL</Item>
  <Action>Select on DU 2</Action>
</ChecklistItem> 
*/
