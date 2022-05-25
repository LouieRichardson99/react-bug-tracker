import { FC } from "react";
import { Link } from "react-router-dom";
import { Container, Logo, Navigation, NavItem } from "./Header.styles";
import { getCurrentPathname } from "../../utils/navigation";

export const Header: FC = () => {
  return (
    <Container>
      <Logo>
        Bug<span>zy</span>
      </Logo>
      <Navigation>
        <ul>
          <NavItem isActive={getCurrentPathname("/login")}>
            <Link to="/login">Sign in</Link>
          </NavItem>
          <NavItem isActive={getCurrentPathname("/signup")}>
            <Link to="/signup">Register</Link>
          </NavItem>
        </ul>
      </Navigation>
    </Container>
  );
};
