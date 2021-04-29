import { Flex, Heading, Text } from "@chakra-ui/react";
var parseString = require("xml2js").parseString;
interface ChecklistProps {}

let xml = `
<root><ChecklistTitle>Configuration Safety Checklist</ChecklistTitle><ChecklistItems><ChecklistItem>SLAT/FLAP lever</ChecklistItem><ChecklistAction>
    In agreement with actual Slat/Flap position
  </ChecklistAction>
</ChecklistItems>
<ChecklistItems>
  <ChecklistItem>PARK BRAKE</ChecklistItem>
  <ChecklistAction>ON</ChecklistAction>
</ChecklistItems>
<ChecklistItems>
  <ChecklistItem>BATT 1</ChecklistItem>
  <ChecklistAction>AUTO</ChecklistAction>
</ChecklistItems>
<ChecklistItems>
  <ChecklistItem>BATT 2</ChecklistItem>
  <ChecklistAction>AUTO</ChecklistAction>
</ChecklistItems>
<ChecklistItems><FullRow>Once DU 2 is Powered</FullRow></ChecklistItems>
<ChecklistItems>
  <ChecklistItem>ECL</ChecklistItem>
  <ChecklistAction>Select on DU 2</ChecklistAction>
</ChecklistItems></root>`;
//@ts-ignore
parseString(xml, function (err, result) {
  console.dir(result);
});

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

export const Checklist: React.FC<ChecklistProps> = () => {
  return (
    <Flex direction="column">
      <ChecklistTitle>Configuration Safety Checklist</ChecklistTitle>
      <ChecklistItems>
        <ChecklistItem>SLAT/FLAP lever</ChecklistItem>
        <ChecklistAction>
          In agreement with actual Slat/Flap position
        </ChecklistAction>
      </ChecklistItems>
      <ChecklistItems>
        <ChecklistItem>PARK BRAKE</ChecklistItem>
        <ChecklistAction>ON</ChecklistAction>
      </ChecklistItems>
      <ChecklistItems>
        <ChecklistItem>BATT 1</ChecklistItem>
        <ChecklistAction>AUTO</ChecklistAction>
      </ChecklistItems>
      <ChecklistItems>
        <ChecklistItem>BATT 2</ChecklistItem>
        <ChecklistAction>AUTO</ChecklistAction>
      </ChecklistItems>
      <ChecklistBreak>Once DU 2 is Powered</ChecklistBreak>
      <ChecklistItems>
        <ChecklistItem>ECL</ChecklistItem>
        <ChecklistAction>Select on DU 2</ChecklistAction>
      </ChecklistItems>
    </Flex>
  );
};
