import { FC, useEffect, useState } from "react";
import {
  MenuAlt3Icon,
  HomeIcon,
  OfficeBuildingIcon,
  UsersIcon,
  ChartSquareBarIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  MenuButton,
  NavList,
  NavItem,
  Logo,
  FlexWrapper,
  Button,
  ProfileContainer,
} from "./Sidebar.styles";
import axios from "axios";

export const Sidebar: FC = () => {
  const currentLocation = useLocation().pathname;
  const navigate = useNavigate();

  const [minimised, setMinimised] = useState(false);

  const handleSignOut = () => {
    axios({
      method: "GET",
      url: "http://localhost:8080/users/logout",
      withCredentials: true,
    }).then(() => {
      localStorage.removeItem("user");
      navigate("/login");
    });
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8080/users",
      withCredentials: true,
    }).then((res) => console.log(res));
  }, []);

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
            <NavItem active={currentLocation === "/"}>
              <Link to="/">
                <HomeIcon />
                Dashboard
              </Link>
            </NavItem>
            <NavItem active={currentLocation === "/organisations"}>
              <Link to="/organisations">
                <OfficeBuildingIcon />
                Organisations
              </Link>
            </NavItem>
            <NavItem active={currentLocation === "/team-members"}>
              <Link to="/team-members">
                <UsersIcon />
                Team Members
              </Link>
            </NavItem>
            <NavItem active={currentLocation === "/projects"}>
              <Link to="/projects">
                <ChartSquareBarIcon />
                Projects
              </Link>
            </NavItem>
            <NavItem active={currentLocation === "/settings"}>
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

        <Button onClick={() => handleSignOut()}>
          <LogoutIcon />
          Sign out
        </Button>
      </ProfileContainer>
    </Container>
  );
};
