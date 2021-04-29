import { Box } from "@chakra-ui/react";
interface TestIdWrapperProps {
  id: string;
}

export const TestIdWrapper: React.FC<TestIdWrapperProps> = ({
  children,
  id,
}) => {
  return <Box data-testid={id}>{children}</Box>;
};
