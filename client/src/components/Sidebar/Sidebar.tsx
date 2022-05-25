import { FC, useState } from "react";
import {
  MenuAlt3Icon,
  HomeIcon,
  OfficeBuildingIcon,
  UsersIcon,
  ChartSquareBarIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import {
  Container,
  MenuButton,
  NavList,
  NavItem,
  Logo,
  FlexWrapper,
  ProfileContainer,
} from "./Sidebar.styles";
import { getCurrentPathname } from "../../utils/navigation";
import { SignoutButton } from "../button/SignoutButton";

export const Sidebar: FC = () => {
  const [minimised, setMinimised] = useState(false);

  return (
    <Container>
      <div>
        <FlexWrapper>
          <Logo>
            <Link to="/">
              Bug<span>zy</span>
            </Link>
          </Logo>
          <MenuButton onClick={() => setMinimised(!minimised)}>
            <MenuAlt3Icon />
          </MenuButton>
        </FlexWrapper>

        <nav>
          <NavList>
            <NavItem isActive={getCurrentPathname("/")}>
              <Link to="/">
                <HomeIcon />
                Dashboard
              </Link>
            </NavItem>
            <NavItem isActive={getCurrentPathname("/organisations")}>
              <Link to="/organisations">
                <OfficeBuildingIcon />
                Organisations
              </Link>
            </NavItem>
            <NavItem isActive={getCurrentPathname("/team-members")}>
              <Link to="/team-members">
                <UsersIcon />
                Team Members
              </Link>
            </NavItem>
            <NavItem isActive={getCurrentPathname("/projects")}>
              <Link to="/projects">
                <ChartSquareBarIcon />
                Projects
              </Link>
            </NavItem>
            <NavItem isActive={getCurrentPathname("/settings")}>
              <Link to="/settings">
                <UserCircleIcon />
                Settings
              </Link>
            </NavItem>
          </NavList>
        </nav>
      </div>

      <ProfileContainer>
        <div>{/* User profile */}</div>
        <SignoutButton />
      </ProfileContainer>
    </Container>
  );
};
