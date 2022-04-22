import styled from "styled-components";

interface NavItemProps {
  readonly active: boolean;
}

export const Container = styled.header`
  max-width: 75rem;
  margin: 0 auto;
  padding: 1rem 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const Logo = styled.div`
  color: ${({ theme }) => theme.colors.green};
  font-family: "DM Sans", sans-serif;
  font-size: 3rem;
  font-weight: 500;

  & > span {
    color: ${({ theme }) => theme.colors.body};
    font-family: "DM Sans", sans-serif;
  }
`;

export const Navigation = styled.nav`
  & > ul {
    display: flex;
    list-style: none;
    gap: 2rem;
  }

  @media (max-width: 400px) {
    margin: 0 auto;
  }
`;

export const NavItem = styled.li<NavItemProps>`
  & > a {
    text-decoration: none;
    color: ${({ active, theme }) =>
      active ? theme.colors.green : theme.colors.body};

    &:hover {
      text-decoration: underline;
    }
  }
`;
