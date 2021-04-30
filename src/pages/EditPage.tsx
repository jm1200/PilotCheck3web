import { Flex, Text } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { Checklist } from "./Checklist";

// const htmlparser2 = require("htmlparser2");
interface EditPageProps {}

export const EditPage: React.FC<EditPageProps> = () => {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <Flex w="100%">
      <Flex flex={1} direction="column">
        <Textarea
          fontSize="12px"
          size="lg"
          mt={4}
          h={80}
          placeholder="Copy Text Here."
          onChange={handleChange}
          value={text}
        />
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
