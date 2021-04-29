import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { toErrorMap } from "../utils/toErrorMap";
import { useHistory, useLocation } from "react-router";
import { useAuth } from "../Providers/AuthProvider";
import { TestIdWrapper } from "../components/TestIdWrapper";

export const Login: React.FC<{}> = () => {
  // const [login] = useLoginMutation();
  const { signin } = useAuth();
  const history = useHistory();
  const location = useLocation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          //signin! will be defined by useProviderAuth hook
          const response = await signin!(values);

          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            history.push((location.state as string) || "/home");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="email"
              placeholder="email"
              label="Email"
              data-testid="loginInputEmail"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
                data-testid="loginInputPassword"
              />
            </Box>

            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
              data-testid="loginSubmit"
            >
              login
              {/* <TestIdWrapper id="loginSubmit">login</TestIdWrapper> */}
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
