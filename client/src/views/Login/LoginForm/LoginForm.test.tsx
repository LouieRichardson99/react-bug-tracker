import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { LoginForm } from "./LoginForm";

// Mock useNavigate() function
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => jest.fn(),
}));

describe("LoginForm", () => {
  const setup = () =>
    render(
      <Router>
        <LoginForm />
      </Router>
    );

  test("inputs should initially be empty", async () => {
    setup();

    const emailInput = getEmailInput();
    const passwordInput = getPasswordInput();

    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
  });

  test("should display 'required' errors when values are empty", async () => {
    setup();

    const submitButton = getSubmitButton();
    await user.click(submitButton);

    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });

  test("should display invalid input labels", async () => {
    setup();

    const emailInput = getEmailInput();
    const passwordInput = getPasswordInput();
    const submitButton = getSubmitButton();

    await user.type(emailInput, "invalid email"); // Not an email address
    await user.type(passwordInput, "invalid"); // Less than 8 characters
    await user.click(submitButton);

    expect(
      await screen.findByText("Must be a valid email address")
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Password should be at least 8 characters")
    ).toBeInTheDocument();
  });
});

// Get LoginForm elements
function getEmailInput() {
  return screen.getByRole("textbox", {
    name: /email address/i,
  });
}

function getPasswordInput() {
  return screen.getByLabelText("Password");
}

function getSubmitButton() {
  return screen.getByRole("button", {
    name: /sign in/i,
  });
}
