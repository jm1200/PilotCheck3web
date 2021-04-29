import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { useState } from "react";
import XMLToReact from "@condenast/xml-to-react";

// const htmlparser2 = require("htmlparser2");
interface EditPageProps {}

export const EditPage: React.FC<EditPageProps> = () => {
  const [text, setText] = useState("");

  const RenderedDom = () => {
    const xmlToReact = new XMLToReact({
      root: () => ({ type: "div" }),
      bold: () => ({ type: "strong" }),
      note: () => ({ type: Note }),
      noteTitle: () => ({ type: NoteTitle }),
      noteText: () => ({ type: NoteText }),
      checklist: () => ({ type: Checklist }),
      checklistTitle: () => ({ type: ChecklistTitle }),
      checklistItems: () => ({ type: ChecklistItems }),
      checklistItem: () => ({ type: ChecklistItem }),
      checklistAction: () => ({ type: ChecklistAction }),
      checklistBreak: () => ({ type: ChecklistBreak }),
    });

    let newDom = xmlToReact.convert(`<root>${text}</root>`);

    if (newDom) {
      return <Box w="100%">{newDom}</Box>;
    } else {
      return <div>Invalid XML</div>;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  return (
    <Flex w="100%">
      <Flex flex={1}>
        <Textarea
          size="lg"
          placeholder="Copy Text Here."
          onChange={handleChange}
          value={text}
        />
      </Flex>
      <Flex flex={1} p={2}>
        <RenderedDom />
      </Flex>
    </Flex>
  );
};

const NoteTitle: React.FC<{}> = ({ children }) => {
  return <Heading>{children}</Heading>;
};

const NoteText: React.FC<{}> = ({ children }) => {
  return <Text>{children}</Text>;
};

const Note: React.FC<{}> = ({ children }) => {
  console.log(children);
  return (
    <Box w="100%" bgColor="blue.300">
      {children}
    </Box>
  );
};

const Checklist: React.FC<{}> = ({ children }) => {
  console.log("checklist", children);
  return (
    <Box w="100%" p={3} bgColor="red.300">
      {children}
    </Box>
  );
};

const ChecklistTitle: React.FC<{}> = ({ children }) => {
  return <Heading>{children}</Heading>;
};

const ChecklistItems: React.FC<{}> = ({ children }) => {
  return (
    <Flex w="100%" direction="row">
      {children}
    </Flex>
  );
};

const ChecklistBreak: React.FC<{}> = ({ children }) => {
  return <Text>{children}</Text>;
};

const ChecklistItem: React.FC<{}> = ({ children }) => {
  return <Flex flex={1}>{children}</Flex>;
};

const ChecklistAction: React.FC<{}> = ({ children }) => {
  return <Text>{children}</Text>;
};

/*

<checklist><checklistTitle>Configuration Safety Checklist</checklistTitle>
<checklistItems><checklistItem>SLAT/FLAP lever</checklistItem>	<checklistAction>In agreement with actual Slat/Flap position</checklistAction></checklistItems>
<checklistItems><checklistItem>PARK BRAKE</checklistItem>	<checklistAction>ON</checklistAction></checklistItems>
<checklistItems><checklistItem>BATT 1</checklistItem>	<checklistAction>AUTO</checklistAction></checklistItems>
<checklistItems><checklistItem>BATT 2</checklistItem>	<checklistAction>AUTO</checklistAction></checklistItems>
<checklistBreak>Once DU 2 is Powered</checklistBreak>
<checklistItems><checklistItem>ECL</checklistItem>	<checklistAction>Select on DU 2</checklistAction></checklist></checklistItems>





 */
