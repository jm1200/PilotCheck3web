import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation } from "react-router";
import { Checklist } from "./Checklist";

// const htmlparser2 = require("htmlparser2");
interface EditPageProps {}

export const EditPage: React.FC<EditPageProps> = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(e.target.value);
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const folderId = query.get("folderId");
  const handleSave = () => {
    let newChecklist = {
      title,
      text,
      folderId,
    };
    console.log("saving: ", newChecklist);
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
          <Input
            w="20%"
            value={order}
            onChange={handleOrderChange}
            placeholder="Order "
            size="sm"
            type="number"
          />
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
