import styled from "styled-components";

export const Button = styled.button`
  background-color: hsl(0, 0%, 100%);
  border: none;
  padding: 0.75rem;
  display: flex;
  width: 100%;
  align-items: center;
  display: flex;
  gap: 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.body};
  border-radius: 5px;
  cursor: pointer;

  & > svg {
    width: 1.25rem;
  }
`;
