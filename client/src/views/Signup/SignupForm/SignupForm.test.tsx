import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { SignupForm } from "./SignupForm";

// Mock useNavigate() function
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => jest.fn(),
}));

describe("SignupForm", () => {
  const setup = () => render(<SignupForm />);

  test("inputs should initially be empty", async () => {
    setup();

    const fullnameInput = getFullnameInput();
    const emailInput = getEmailInput();
    const organisationInput = getOrganisationInput();
    const passwordInput = getPasswordInput();
    const confirmPasswordInput = getConfirmPasswordInput();

    expect(fullnameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
    expect(organisationInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
    expect(confirmPasswordInput).toHaveValue("");
  });

  test("should display 'required' errors when values are empty", async () => {
    setup();

    const submitButton = getSubmitButton();
    await user.click(submitButton);

    expect(
      await screen.findByText("Full name is required")
    ).toBeInTheDocument();
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(
      await screen.findByText("Organisation name is required")
    ).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
    expect(
      await screen.findByText("Confirm password is required")
    ).toBeInTheDocument();
  });

  test("should display invalid email input label", async () => {
    setup();

    const submitButton = getSubmitButton();
    const emailInput = getEmailInput();

    await user.type(emailInput, "invalid email");
    await user.click(submitButton);

    expect(
      await screen.findByText("Must be a valid email address")
    ).toBeInTheDocument();
  });

  test("should display invalid password input labels", async () => {
    setup();

    const submitButton = getSubmitButton();
    const passwordInput = getPasswordInput();
    const confirmPasswordInput = getConfirmPasswordInput();

    await user.type(passwordInput, "invalid password");
    await user.type(confirmPasswordInput, "another password");
    await user.click(submitButton);

    expect(
      await screen.findByText(
        "Password must have at least eight characters, one upper case letter, one lower case letter, one number, and one special character"
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Passwords do not match")
    ).toBeInTheDocument();
  });
});

// Get SignupForm elements
function getFullnameInput() {
  return screen.getByRole("textbox", {
    name: /full name/i,
  });
}

function getEmailInput() {
  return screen.getByRole("textbox", {
    name: /email address/i,
  });
}

function getOrganisationInput() {
  return screen.getByRole("textbox", {
    name: /organisation name/i,
  });
}

function getPasswordInput() {
  return screen.getByLabelText("Password");
}

function getConfirmPasswordInput() {
  return screen.getByLabelText(/confirm password/i);
}

function getSubmitButton() {
  return screen.getByRole("button", {
    name: /register/i,
  });
}
