import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 0.75rem;
  max-width: 35rem;
  width: 100%;
  margin: 0 auto;
`;

export const Button = styled.button`
  display: block;
  width: fit-content;
  background-color: #7db46c;
  border: none;
  color: #fff;
  padding: 0 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.1s ease-in;
  display: flex;
  align-items: center;
  font-weight: 500;
  height: 2.25rem;
  justify-content: center;

  &:hover {
    background-color: #69a357;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }

  &:focus {
    outline: #638f55 2px solid;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 0.75rem;
  }
`;
