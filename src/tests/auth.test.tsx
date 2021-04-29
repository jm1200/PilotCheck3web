import React from "react";
import { cleanup, render, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import { AuthProvider } from "../Providers/AuthProvider";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

const customRender = (ui: React.ReactElement) => {
  return render(
    <ApolloProvider client={client}>
      <AuthProvider>{ui}</AuthProvider>
    </ApolloProvider>
  );
};

afterEach(cleanup);

describe("First test", () => {
  test("testing", async () => {
    const { getByTestId } = customRender(<App />);
    const loginLink = getByTestId("loginLink");

    fireEvent.click(loginLink);

    const loginSubmit = getByTestId("loginSubmit");
    const loginInputEmail = getByTestId("loginInputEmail");
    const loginInputPassword = getByTestId("loginInputPassword");

    expect(loginSubmit).toBeDefined();
    expect(loginInputEmail).toBeDefined();
    expect(loginInputPassword).toBeDefined();

    fireEvent.change(loginInputEmail, { target: { value: "bob@bob.com" } });
    fireEvent.change(loginInputPassword, { target: { value: "bob" } });
    fireEvent.click(loginSubmit);

    let logoutButton: HTMLElement | null = null;
    await waitFor(() => {
      logoutButton = getByTestId("logoutButton");
    });

    expect(logoutButton).toBe(!null);
  });
});
