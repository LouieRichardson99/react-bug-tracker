import { FC, useState, useRef, useEffect, Fragment } from "react";
import { UseFormRegister, Path } from "react-hook-form";
import {
  Label,
  Container,
  Input,
  ErrorMessage,
  EyeIconButton,
} from "./PasswordField.styles";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";

interface FormValues {
  password?: string;
  repeatPassword?: string;
}

type Props = {
  label: string;
  name: Path<FormValues>;
  placeholder?: string;
  register: UseFormRegister<FormValues>;
  showEye?: boolean;
  onChange?: (e: any) => void;
  error?: { message?: string };
};

export const PasswordField: FC<Props> = ({
  label,
  name,
  placeholder,
  register,
  onChange,
  error,
  showEye,
}) => {
  const isError = error ? true : false;
  const [showPassword, setShowPassword] = useState(false);

  const input = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Show/hide the password
    if (input.current === null) return;
    const type = showPassword ? "text" : "password";

    input.current.type = type;
  }, [showPassword]);

  const { ref, ...rest } = register(name);

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Container>
        <Input
          {...register(name, { onChange })}
          {...rest}
          id={name}
          ref={(e) => {
            ref(e);
            input.current = e;
          }}
          type="password"
          placeholder={placeholder}
          isError={isError}
        />
        {showEye && (
          <Fragment>
            {showPassword ? (
              <EyeIconButton
                type="button"
                aria-label="Hide password"
                title="Hide password"
              >
                <EyeOffIcon
                  onClick={() => setShowPassword(false)}
                  className="input-eye-icon"
                />
              </EyeIconButton>
            ) : (
              <EyeIconButton
                type="button"
                aria-label="Reveal password"
                title="Reveal password"
              >
                <EyeIcon
                  onClick={() => setShowPassword(true)}
                  className="input-eye-icon"
                />
              </EyeIconButton>
            )}
          </Fragment>
        )}
      </Container>
      {isError && <ErrorMessage>{error?.message}</ErrorMessage>}
    </div>
  );
};

PasswordField.defaultProps = {
  showEye: true,
};
