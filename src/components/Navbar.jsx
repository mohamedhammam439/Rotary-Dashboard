
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Logo from "../assets/rotary.png";
import ProfileImg from "../assets/profile1.jpg"
import { useContext } from "react";
import { MyContext } from "../context/Mycontext";
import { NavLink } from "react-router-dom";

export function MyNavbar() {
  const {profile} = useContext(MyContext)
  return (
    <Navbar fluid className="border-b">
      <Navbar.Brand href="https://flowbite-react.com">
        <img src={Logo} className="mr-3 h-12" alt="Rotary" />
        {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span> */}
      </Navbar.Brand>
      {/* <div className="flex">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={ProfileImg} rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{profile?.fullName}</span>
            <span className="block truncate text-sm font-medium">{profile?.email}</span>
          </Dropdown.Header>
          <NavLink className="text-left" to="clubLayout"><Dropdown.Item>Clubs</Dropdown.Item></NavLink>
          <NavLink className="text-left" to="memberLayout"><Dropdown.Item>Members</Dropdown.Item></NavLink>
          <NavLink className="text-left" to="myProfile"><Dropdown.Item>My Profile</Dropdown.Item></NavLink>
          
        
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div> */}
      {/* <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse> */}
    </Navbar>
  );
}
