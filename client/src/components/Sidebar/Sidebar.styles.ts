import styled from "styled-components";

interface NavItemProps {
  readonly isActive: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: hsl(0, 0%, 20%);
  max-width: 17.5rem;
  min-height: 100vh;
  height: auto;
`;

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0.75rem 3rem 0.75rem;
`;

export const Logo = styled.div`
  & > a {
    color: ${({ theme }) => theme.colors.green};
    text-decoration: none;
    font-weight: 500;
    font-size: 1.75rem;
    font-family: "DM Sans", sans-serif;

    & > span {
      color: hsl(0, 0%, 100%);
      font-family: "DM Sans", sans-serif;
    }
  }
`;

export const MenuButton = styled.button`
  border: none;
  background: none;
  width: 2rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  & > svg {
    color: hsl(0, 0%, 100%);
  }
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  list-style: none;
`;

export const NavItem = styled.li<NavItemProps>`
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.green : "hsl(0, 0%, 100%)"};
  border-radius: 5px;

  & > a {
    color: ${({ isActive, theme }) =>
      isActive ? "hsl(0, 0%, 100%)" : theme.colors.body};
    text-decoration: none;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    padding: 0.75rem;
  }

  & svg {
    width: 1.25rem;
  }
`;

export const ProfileContainer = styled.div`
  padding: 0.75rem;
`;
