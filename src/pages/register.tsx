import React from "react";
import { Formik, Form } from "formik";
import { Box } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { toErrorMap } from "../utils/toErrorMap";
import { useAuth } from "../Providers/AuthProvider";
import { useHistory, useLocation } from "react-router";
import { CustomButton } from "../components/form/CustomButton";

export const Register: React.FC<{}> = () => {
  const { signup } = useAuth();
  const history = useHistory();
  const location = useLocation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          //signup! will be defined by useProviderAuth hook
          const response = await signup!(values);
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            history.push((location.state as string) || "/home");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField name="email" placeholder="email" label="Email" />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <CustomButton mt={4} isLoading={isSubmitting} text="Register" />
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
