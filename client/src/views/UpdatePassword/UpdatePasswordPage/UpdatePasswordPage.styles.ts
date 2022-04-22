import styled from "styled-components";

export const Container = styled.div`
  background-color: #fafafa;
  min-height: 100vh;
  height: auto;
`;

export const Title = styled.h1`
  font-size: 2.25rem;
  text-align: center;
  color: #383838;
  font-weight: 500;
  padding: 3rem 0.75rem 0 0.75rem;
  margin-bottom: 1.5rem;
  font-family: "DM Sans", sans-serif;

  @media (max-width: 750px) {
    font-size: 2rem;
  }

  @media (max-width: 600px) {
    font-size: 1.75rem;
  }
`;

export const CenteredText = styled.p`
  color: #383838;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  padding: 0 0.75rem;
  margin-top: 1rem;

  & > a {
    color: #7db46c;
    text-decoration: none;
    transition: 0.1s ease-in;

    &:hover {
      color: #69a357;
    }
  }

  @media (max-width: 600px) {
    justify-content: left;
  }
`;
