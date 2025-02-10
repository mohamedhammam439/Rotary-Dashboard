import { Sidebar } from "flowbite-react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MyContext } from "../context/Mycontext";
import Cookies from "js-cookie";

export function MySideBar() {
  const { setIsLogedIn, setAccessToken,refreshToken, setRefreshToken, profile } =
    useContext(MyContext);
  const accessToken = Cookies.get("accessToken");

  const Logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("role");
    Cookies.remove("clubName");
    // Cookies.remove('refreshToken', refreshToken)
    setIsLogedIn(false);
    setAccessToken("");
    setRefreshToken("");
    axios.get("https://rotary.shakoush.xyz/users/logout", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };
  return (
    <Sidebar
      aria-label="Sidebar with logo branding example"
      className="vh_height"
    >
      {/* <Sidebar.Logo href="#" img="/favicon.svg" imgAlt="Flowbite logo">
        Flowbite
      </Sidebar.Logo> */}
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <NavLink className="text-left" to="/">
            <Sidebar.Item>District</Sidebar.Item>
          </NavLink>
          <NavLink className="text-left" to="clubLayout">
            <Sidebar.Item>Clubs</Sidebar.Item>
          </NavLink>
          <NavLink className="text-left" to="membersLayout">
            <Sidebar.Item>Members</Sidebar.Item>
          </NavLink>
          {/* <NavLink className="text-left" to="clubmembersLayout">
            <Sidebar.Item>Club Members</Sidebar.Item>
          </NavLink> */}

          <NavLink className="text-left" to="districtCommities">
            <Sidebar.Item>District Committees</Sidebar.Item>
          </NavLink>

          <NavLink className="text-left" to="districtCommitiesMembers">
            <Sidebar.Item>District Committee Members</Sidebar.Item>
          </NavLink>

          <NavLink className="text-left" to="districtEmployee">
            <Sidebar.Item>District Employees</Sidebar.Item>
          </NavLink>
          {profile.rotarianId === "13923851" ? (
            <NavLink className="text-left" to="aboutUs">
              <Sidebar.Item>About Us</Sidebar.Item>
            </NavLink>
          ) : null}

          <NavLink className="text-left" to="governor">
            <Sidebar.Item>Governor</Sidebar.Item>
          </NavLink>

          <NavLink className="text-left" to="governorHistory">
            <Sidebar.Item>Governor History</Sidebar.Item>
          </NavLink>

          <NavLink className="text-left" onClick={() => Logout()}>
            <Sidebar.Item>Log Out</Sidebar.Item>
          </NavLink>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
