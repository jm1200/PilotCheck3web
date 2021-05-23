import { Box, Text, Switch, FormLabel, FormControl } from "@chakra-ui/react";
import React from "react";
import { useAppState } from "../Providers/AppStateProvider";
interface AccountProps {}

export const Account: React.FC<AccountProps> = () => {
  let { theme, setTheme } = useAppState();

  const handleClick = () => {
    // console.log("Account.tsx 12 clicked:");
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  };
  return (
    <Box>
      <Text>Account Page</Text>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="0">
          {theme === "dark" ? "Dark mode" : "Light mode"}
        </FormLabel>
        <Switch
          id="email-alerts"
          isChecked={theme === "dark"}
          onChange={handleClick}
        />
      </FormControl>
    </Box>
  );
};
