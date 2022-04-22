import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Logo, Navigation, NavItem } from "./Header.styles";

export const Header: FC = () => {
  const currentLocation = useLocation().pathname;

  return (
    <Container>
      <Logo>
        Bug<span>zy</span>
      </Logo>
      <Navigation>
        <ul>
          <NavItem active={currentLocation === "/login"}>
            <Link to="/login">Sign in</Link>
          </NavItem>
          <NavItem active={currentLocation === "/signup"}>
            <Link to="/signup">Register</Link>
          </NavItem>
        </ul>
      </Navigation>
    </Container>
  );
};
