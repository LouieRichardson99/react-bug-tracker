import styled from "styled-components";

interface InputProps {
  readonly isError: boolean;
}

export const Container = styled.div`
  position: relative;
`;

export const Label = styled.label`
  color: #383838;
  margin-bottom: 0.75rem;
  display: block;
  font-size: 1.125rem;
`;

export const Input = styled.input<InputProps>`
  background-color: #fff;
  padding: 0.75rem 0.5rem;
  outline: ${(props) =>
    props.isError ? "1px solid #EF4444" : "1px solid #AFAFAF"};
  border: none;
  border-radius: 5px;
  width: 100%;
  color: ${(props) => (props.isError ? "#EF4444" : "#383838")};
  font-size: 1rem;

  &::placeholder {
    color: #8c8c8c;
  }

  &:focus {
    outline: ${(props) =>
      props.isError ? "2px solid #EF4444" : "#7db46c 2px solid"};
  }
`;

export const ErrorMessage = styled.label`
  display: block;
  font-size: 0.875rem;
  color: #ef4444;
  margin-top: 0.5rem;
  font-weight: 300;
`;

export const EyeIconButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.35rem;
  height: 1.35rem;
  color: #6c6c6c;
  cursor: pointer;
`;
