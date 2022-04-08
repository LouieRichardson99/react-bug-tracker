import styled from "styled-components";

export const Container = styled.div`
  background-color: #f3f5ee;
  min-height: 100vh;
  height: auto;
`;

export const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  color: #383838;
  font-weight: 500;
  padding: 3rem 1rem 0 1rem;

  @media (max-width: 750px) {
    font-size: 2.5rem;
  }

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

export const NoAccountText = styled.p`
  color: #383838;
  display: flex;
  gap: 0.5rem;
  justify-content: center;

  & > a {
    color: #7db46c;
    text-decoration: none;
    transition: 0.1s ease-in;

    &:hover {
      color: #69a357;
    }
  }
`;
