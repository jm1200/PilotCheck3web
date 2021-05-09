import React from "react";
import { Formik, Form } from "formik";
import { Box } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { toErrorMap } from "../utils/toErrorMap";
import { useAuth } from "../Providers/AuthProvider";
import { RouteProps, useHistory } from "react-router";
import { CustomButton } from "../components/form/CustomButton";

export const Login: React.FC<RouteProps> = ({ location }) => {
  const { signin } = useAuth();
  const history = useHistory();
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
            history.push((location?.state as string) || "/home");
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

            <CustomButton mt={4} isLoading={isSubmitting} text="Login" />
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
