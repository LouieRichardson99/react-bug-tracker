import { FC } from "react";
import { UseFormRegister, Path } from "react-hook-form";
import { Input, Label, Container, ErrorMessage } from "./TextField.styles";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

interface FormValues {
  fullName?: string;
  email?: string;
  organisationName?: string;
}

type Props = {
  label: string;
  name: Path<FormValues>;
  type: string;
  placeholder?: string;
  register: UseFormRegister<FormValues>;
  error?: { message?: string };
};

export const TextField: FC<Props> = ({
  label,
  name,
  type,
  placeholder,
  register,
  error,
}) => {
  const isError = error ? true : false;

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Container>
        <Input
          {...register(name)}
          name={name}
          id={name}
          type={type}
          placeholder={placeholder}
          isError={isError}
        />
        {isError && <ExclamationCircleIcon className="input-error-icon" />}
      </Container>
      {isError && <ErrorMessage>{error?.message}</ErrorMessage>}
    </div>
  );
};
