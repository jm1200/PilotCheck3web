import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { firstCharLowerCase, parseBooleans } from "xml2js/lib/processors";
import { Parser } from "xml2js";
import { useState } from "react";
interface ChecklistProps {}

let xml = `
<root>
<ChecklistTitle>Configuration Safety Checklist</ChecklistTitle>
<ChecklistItem><Item>SLAT/FLAP lever</Item><Action>
    In agreement with actual Slat/Flap position
  </Action>
  </ChecklistItem>

<ChecklistItem ffod="true" done="true">
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
</ChecklistItem></root>`;

let x = new Parser({
  mergeAttrs: true,
  explicitArray: false,
  attrValueProcessors: [parseBooleans],
  tagNameProcessors: [firstCharLowerCase],
});

type ChecklistResult = {
  root: Checklist;
};

type Checklist = {
  checklistTitle: string;
  checklistItem: [CheckType];
};

class CheckType {
  item: string = "";
  action: string = "";
  ffod: boolean = false;
  done: boolean = false;
  fullRow: boolean = false;
}

export const Checklist: React.FC<ChecklistProps> = () => {
  let ffod = true;

  let defaultChecklist: Checklist = {} as Checklist;
  x.parseString(
    xml,
    // {
    //   attrValueProcessors: [parseBooleans],
    // },

    function (err: any, result: ChecklistResult) {
      result.root.checklistItem.forEach((item) => {
        if (!item.ffod) {
          item.ffod = false;
        }
        if (!item.done) {
          item.done = false;
        }
        if (!item.fullRow) {
          item.fullRow = false;
        }
      });

      console.log(result);

      defaultChecklist = result.root;

      if (err) {
        console.log(err);
      }
    }
  );

  const [checklist, setChecklist] = useState<Checklist>(defaultChecklist);

  const handleClickDone = (item: string) => {
    console.log(item);
    checklist.checklistItem.forEach((check) => {
      if (check.item === item) {
        console.log("Checklist.tsx 91 found item:", check);
        check.done = !check.done;
        console.log("Checklist.tsx 93 found item:", check);
      }
    });

    setChecklist({ ...checklist });
  };

  return (
    <Flex direction="column" p={2}>
      <Heading>{checklist.checklistTitle}</Heading>
      <Box p={2}>
        {checklist.checklistItem
          .filter((item) => {
            if (!ffod && item.ffod) {
              return false;
            } else return true;
          })
          .map((item, i) => {
            return (
              <Check
                key={`${i}${item}`}
                {...item}
                handleClickDone={handleClickDone}
              />
            );
          })}
      </Box>
    </Flex>
  );
};

interface CheckProps extends CheckType {
  handleClickDone: (item: string) => void;
}

export const Check: React.FC<CheckProps> = ({
  item,
  action,
  done,
  fullRow,
  handleClickDone,
}) => {
  return (
    <Flex
      my={2}
      p={2}
      bgColor={done ? "green.200" : "red.200"}
      onClick={() => handleClickDone(item)}
    >
      <Text
        fontWeight="bold"
        flex={1}
        color="black"
        textAlign={fullRow ? "center" : undefined}
      >
        {item}
      </Text>
      <Text fontSize="sm" color="black">
        {action}
      </Text>
    </Flex>
  );
};
