import { Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Redirect, RouteProps, useHistory, useLocation } from "react-router";
import { options } from "../components/Directories/utils";
import { Folder, File } from "../types";
import { Checklist } from "./Checklist";
import { v4 as uuid } from "uuid";
import {
  useMeQuery,
  UserDataDocument,
  UserDataQuery,
  useSetDataMutation,
  useUserDataQuery,
} from "../generated/graphql";
import { addFile, deleteFile, editFile } from "../utils/addFile";

interface EditPageProps extends RouteProps {}

export const EditPage: React.FC<EditPageProps> = ({ location }) => {
  const { data: meData, loading: meLoading } = useMeQuery();

  const { state } = useLocation<{ file: File; folder: Folder }>();
  const history = useHistory();
  const { data: userData } = useUserDataQuery();
  console.log("EditPage.tsx 24 state:", state);

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
    let isMounted = true;
    if (isMounted) {
      let { order, title, xml } = state.file;

      setText(xml);
      setOrder(order);
      setTitle(title);
    }

    return () => {
      isMounted = false;
    };
  }, [state]);

  let optArr: JSX.Element[] = [];
  if (state.file.id) {
    optArr = options(state.folder.contents.files.length);
  } else {
    optArr = options(state.folder.contents.files.length + 1);
  }

  const handleSave = async () => {
    if (userData) {
      const { directories, id } = userData!.userData!;
      const oldDirectories = JSON.parse(directories);
      let checklist: File;
      if (state.file.id) {
        console.log("Editing a file");
        checklist = { id: state.file.id, title, order, xml: text };
        editFile(oldDirectories, checklist, state.folder.id);
      } else {
        console.log("Adding a file");
        checklist = { id: uuid(), title, order, xml: text };
        addFile(oldDirectories, checklist, state.folder.id);
      }

      try {
        await setData({
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
                  __typename: "Data",
                  id,
                  directories: JSON.stringify(oldDirectories),
                },
              },
            });
          },
        });
      } catch (error) {
        console.log("error setting data from edit page", error);
      }
    }
  };
  const handleDelete = async () => {
    if (userData) {
      const { directories, id } = userData!.userData!;
      const oldDirectories = JSON.parse(directories);
      deleteFile(oldDirectories, state.file, state.folder.id);

      try {
        await setData({
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
                  __typename: "Data",
                  id,
                  directories: JSON.stringify(oldDirectories),
                },
              },
            });
          },
        });

        history.push("./home");
      } catch (error) {
        console.log("error deleting data from edit page", error);
      }
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

          <Select w="20%" value={order} onChange={handleOrderChange}>
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
        <Flex>
          <Button my={2} mx="auto" w="90%" size="sm" onClick={handleSave}>
            Save
          </Button>
          {state.file.id && (
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </Flex>
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
