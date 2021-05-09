import { EditIcon } from "@chakra-ui/icons";
import { Flex, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import {
  MdChevronRight,
  MdCreateNewFolder,
  MdExpandMore,
  MdFolder,
  MdInsertDriveFile,
  MdNoteAdd,
} from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  UserDataDocument,
  UserDataQuery,
  useSetDataMutation,
} from "../../generated/graphql";
import { useAuth } from "../../Providers/AuthProvider";
import { Folder } from "../../types";
import { AddFolderForm } from "./AddFolderForm";
import { EditFolderForm } from "./EditFolderForm";

interface DirectoriesProps {
  subDirectories: Folder[];
  setDirectories: React.Dispatch<React.SetStateAction<Folder[] | undefined>>;
  topLevelDirectories: Folder[];
  depth: number;
}

export const Directories: React.FC<DirectoriesProps> = ({
  subDirectories,
  setDirectories,
  topLevelDirectories,
  depth,
}) => {
  const [editMode, setEditMode] = useState("");
  const [addMode, setAddMode] = useState("");
  const [setData] = useSetDataMutation();
  const { user } = useAuth();
  const { id } = user!.me!.data;

  const handleClick = (folder: Folder) => {
    folder.open = !folder.open;
    setDirectories(JSON.parse(JSON.stringify(topLevelDirectories)));
  };

  const handleAddFolder = async (
    title: string,
    order: number,
    subDirectory: Folder
  ) => {
    const newObj: Folder = {
      contents: { folders: [], files: [] },
      title: title,
      id: uuid(),
      open: false,
      order: order,
      editable: true,
    };

    let parentFolderArray = subDirectory.contents.folders;

    subDirectory.open = true;
    if (parentFolderArray.length === 0) {
      parentFolderArray.push(newObj);
    } else {
      parentFolderArray.splice(order, 0, newObj);

      //reset all orders
      parentFolderArray.forEach((el, i) => (el.order = i));
    }

    setAddMode("");
    // setDirectories(JSON.parse(JSON.stringify(topLevelDirectories)));

    try {
      await setData({
        variables: { directories: JSON.stringify(topLevelDirectories) },
        update: (cache) => {
          cache.writeQuery<UserDataQuery>({
            query: UserDataDocument,
            data: {
              userData: {
                __typename: "Data",
                id,
                directories: JSON.stringify(topLevelDirectories),
              },
            },
          });
        },
      });
    } catch (error) {
      console.log("error setting data from edit page", error);
    }
  };

  const handleDelete = async (parentArray: Folder[], i: number) => {
    parentArray!.splice(i, 1);
    //reset all orders
    parentArray.forEach((el, i) => (el.order = i));

    try {
      await setData({
        variables: { directories: JSON.stringify(topLevelDirectories) },
        update: (cache) => {
          cache.writeQuery<UserDataQuery>({
            query: UserDataDocument,
            data: {
              userData: {
                __typename: "Data",
                id,
                directories: JSON.stringify(topLevelDirectories),
              },
            },
          });
        },
      });
    } catch (error) {
      console.log("error setting data from edit page", error);
    }
  };

  const handleEditFolder = async (
    parentArray: Folder[],
    i: number,
    directory: Folder,
    title: string,
    order: number
  ) => {
    let tempEdit: Folder = {
      ...directory,
      open: false,
      title: title,
      order,
    };
    //get rid of old index

    parentArray!.splice(directory.order, 1);

    //insert new
    parentArray!.splice(order, 0, tempEdit);
    parentArray.forEach((el, i) => (el.order = i));
    setEditMode("");

    try {
      await setData({
        variables: { directories: JSON.stringify(topLevelDirectories) },
        update: (cache) => {
          cache.writeQuery<UserDataQuery>({
            query: UserDataDocument,
            data: {
              userData: {
                __typename: "Data",
                id,
                directories: JSON.stringify(topLevelDirectories),
              },
            },
          });
        },
      });
    } catch (error) {
      console.log("error setting data from edit page", error);
    }
  };

  const handleEditMode = (id: string) => {
    setAddMode("");
    if (editMode === "") {
      setEditMode(id);
    } else {
      setEditMode("");
    }
  };
  const handleAddMode = (id: string) => {
    setEditMode("");

    if (addMode === "" || addMode !== id) {
      setAddMode(id);
    } else {
      setAddMode("");
    }
  };
  return (
    <Flex direction="column">
      {subDirectories.map((subDirectory, i) => {
        let nextDirectories = subDirectory.contents.folders;
        let files = subDirectory.contents.files;
        let length = 0;
        if (nextDirectories?.length) {
          length = nextDirectories.length;
        }

        return (
          <Flex
            key={i}
            ml={depth * 2}
            borderLeftWidth="2px"
            pl={2}
            mt={2}
            direction="column"
          >
            <Flex w="100%" direction="column">
              <Flex w="100%">
                <Flex alignItems="center" w="100%">
                  <MdFolder fontSize="14px" />
                  <Text
                    ml={2}
                    fontSize="14px"
                    flex={1}
                    onClick={() => handleClick(subDirectory)}
                  >
                    {subDirectory.title}
                  </Text>
                  {subDirectory.open && (
                    <Flex alignItems="center">
                      <MdCreateNewFolder
                        onClick={() => handleAddMode(subDirectory.id)}
                      />
                      <Link
                        mx={1}
                        p={1}
                        outline="false"
                        aria-label="add file"
                        as={RouterLink}
                        to={{
                          pathname: `/edit-page`,
                          state: {
                            folder: subDirectory,
                            file: {
                              xml: "",
                              title: "",
                              order: subDirectory.contents.files.length,
                            },
                            topLevelDirectories,
                          },
                        }}
                      >
                        <MdNoteAdd />
                      </Link>
                    </Flex>
                  )}
                  {subDirectory.editable && (
                    <EditIcon
                      mr={3}
                      boxSize={3}
                      onClick={() => handleEditMode(subDirectory.id)}
                    />
                  )}
                  {subDirectory.open ? <MdExpandMore /> : <MdChevronRight />}
                </Flex>
              </Flex>
              {editMode === subDirectory.id && (
                <EditFolderForm
                  subDirectories={subDirectories}
                  subDirectory={subDirectory}
                  handleEditMode={handleEditMode}
                  handleDelete={handleDelete}
                  indexToDelete={i}
                  handleEditFolder={handleEditFolder}
                />
              )}
            </Flex>

            {subDirectory.open ? (
              <>
                {addMode === subDirectory.id && (
                  <AddFolderForm
                    handleAddMode={() => handleAddMode(subDirectory.id)}
                    handleAddFolder={handleAddFolder}
                    subDirectory={subDirectory}
                    length={length}
                  />
                )}

                {files.map((file, i) => {
                  return (
                    <Flex alignItems="center" key={file.id}>
                      <MdInsertDriveFile fontSize="14px" />
                      <Link
                        as={RouterLink}
                        to={{
                          pathname: `/edit-page`,
                          state: {
                            file,
                            folder: subDirectory,
                            topLevelDirectories,
                          },
                        }}
                        ml={2}
                      >
                        <Text fontSize="12px">{file.title}</Text>
                      </Link>
                    </Flex>
                  );
                })}

                {nextDirectories && nextDirectories.length > 0 ? (
                  <Directories
                    topLevelDirectories={topLevelDirectories}
                    subDirectories={nextDirectories}
                    depth={depth + 1}
                    setDirectories={setDirectories}
                  />
                ) : files.length === 0 ? (
                  <>
                    <Text w="100%" textAlign="center" fontSize="12px">
                      Folder is empty!
                    </Text>
                  </>
                ) : null}
              </>
            ) : null}
          </Flex>
        );
      })}
    </Flex>
  );
};
