import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { Parser } from "xml2js";
import { firstCharLowerCase, parseBooleans } from "xml2js/lib/processors";
interface ChecklistProps {
  xml: string;
}

let x = new Parser({
  mergeAttrs: true,
  explicitArray: false,
  attrValueProcessors: [parseBooleans],
  tagNameProcessors: [firstCharLowerCase],
});

type ChecklistResult = {
  checklist: ChecklistType;
};

type ChecklistType = {
  checklistTitle: string;
  checklistItem: [CheckType] | CheckType;
};

class CheckType {
  item: string = "";
  action: string = "";
  ffod: boolean = false;
  done: boolean = false;
  fullRow: boolean = false;
}

export const Checklist: React.FC<ChecklistProps> = ({ xml }) => {
  const [checklist, setChecklist] = useState<ChecklistType | null>(null);

  const [ffodState, setffodState] = useState(false);

  useEffect(() => {
    let checklist: ChecklistType | null = null;

    x.parseString(xml, function (err: any, result: ChecklistResult) {
      if (result && result.checklist && result.checklist.checklistItem) {
        if ((result.checklist.checklistItem as [CheckType]).length > 0) {
          (result.checklist.checklistItem as [CheckType]).forEach((item) => {
            if (!item.ffod) {
              item.ffod = false;
            }
            if (!item.done) {
              item.done = false;
            }
            if (!item.fullRow) {
              item.fullRow = false;
            }
            if (!item.item) {
              item.item = "Item description";
            }
            if (!item.action) {
              item.action = "Action";
            }
          });
        } else {
          if (!(result.checklist.checklistItem as CheckType).ffod) {
            (result.checklist.checklistItem as CheckType).ffod = false;
          }
          if (!(result.checklist.checklistItem as CheckType).done) {
            (result.checklist.checklistItem as CheckType).done = false;
          }
          if (!(result.checklist.checklistItem as CheckType).fullRow) {
            (result.checklist.checklistItem as CheckType).fullRow = false;
          }
          if (!(result.checklist.checklistItem as CheckType).item) {
            (result.checklist.checklistItem as CheckType).item =
              "Item description";
          }
          if (!(result.checklist.checklistItem as CheckType).action) {
            (result.checklist.checklistItem as CheckType).action = "Action";
          }
        }
      }

      if (result) {
        checklist = result.checklist;
      } else {
        checklist = null;
      }

      if (err) {
        console.dir(err);
      }
    });
    setChecklist(checklist);
  }, [xml]);

  const handleClickDone = (item: string) => {
    // checklist!.checklistItem.forEach((check) => {
    //   if (check.item === item) {
    //     check.done = !check.done;
    //   }
    // });
    // setChecklist();
  };

  const handleffodStateChange = () => {
    setffodState(!ffodState);
  };

  if (checklist && checklist.checklistItem) {
  }

  if (!checklist) {
    return <Text>missing or invalid XML</Text>;
  } else {
    return (
      <Flex direction="column" p={2} w="100%">
        <Button onClick={handleffodStateChange} w="90%" marginX="auto">
          FFOD {ffodState ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </Button>
        {checklist.checklistTitle ? (
          <Heading textAlign="center">{checklist.checklistTitle}</Heading>
        ) : null}

        {
          //@ts-ignore
          checklist.checklistItem && checklist.checklistItem.length ? (
            <Box p={2}>
              {(checklist.checklistItem as [CheckType])
                .filter((item) => {
                  if (!ffodState && item.ffod) {
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
          ) : checklist.checklistItem ? (
            <Box p={2}>
              <Check
                key={`${(checklist.checklistItem as CheckType).item}`}
                {...(checklist.checklistItem as CheckType)}
                handleClickDone={handleClickDone}
              />
            </Box>
          ) : (
            <Text>No Items yet</Text>
          )
        }

        {/* {checklist.checklistItem.length &&
        checklist.checklistItem.length > 0 ? (
          <Box p={2}>
            {checklist.checklistItem
              .filter((item) => {
                if (!ffodState && item.ffod) {
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
        ) : null} */}
      </Flex>
    );
  }
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
      {action === "Action" ? null : (
        <Text fontSize="sm" color="black">
          {action}
        </Text>
      )}
    </Flex>
  );
};
