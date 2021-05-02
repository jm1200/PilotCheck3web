import { Flex, Input, Button, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { Folder } from "../../types";
import { options } from "./utils";

interface AddFolderFormProps {
  handleAddFolder: (title: string, order: number, subDirectory: Folder) => void;
  subDirectory: Folder;
  handleAddMode: () => void;
  length: number;
}

export const AddFolderForm: React.FC<AddFolderFormProps> = ({
  handleAddFolder,
  subDirectory,
  handleAddMode,
  length,
}) => {
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(length + 1);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(parseInt(e.target.value));
  };

  let optArr = options(length + 1);

  console.log("AddFolderForm.tsx 32 order:", order);

  return (
    <Flex direction="column" m={2} p={2} bgColor="gray.600" borderRadius={5}>
      <Flex></Flex>
      <Flex>
        <Input
          w="100%"
          placeholder="folder name"
          value={title}
          onChange={handleTitleChange}
        />
      </Flex>
      <Flex w="100%" mt={1} justifyContent="space-between" alignItems="center">
        {/* <Input
          w="40%"
          placeholder="order"
          value={order + 1}
          onChange={handleOrderChange}
        /> */}
        <Select w="100%" value={order - 1} onChange={handleOrderChange}>
          {optArr.map((option) => option)}
        </Select>
        <Button
          w="30%"
          h="1.75rem"
          size="sm"
          onClick={() => handleAddFolder(title, order, subDirectory)}
        >
          Save
        </Button>
        <Button w="30%" h="1.75rem" size="sm" onClick={() => handleAddMode()}>
          Cancel
        </Button>
      </Flex>
    </Flex>
  );
};
