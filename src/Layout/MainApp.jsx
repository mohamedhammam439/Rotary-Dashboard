import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { DistrictLayout } from "./dis_Commity/DistrictLayout";
import { ClubLayout } from "../Layout/clubs/ClubLayout";
import { MainLayout } from "../Layout/MainLayout";
import { MembersLayout } from "./members/MembersLayout";
import { MemberDetails } from "./members/MemberDetails";
import { ClubDetails } from "../Layout/clubs/ClubDetails";
import { AddMember } from "./members/AddMember";
import { NotFound } from "../Layout/NotFound";
import { AddClub } from "../Layout/clubs/AddClub";
import Login from "../Login/login";
import { MyNavbar } from "../components/Navbar";
import { useContext } from "react";
import { MyContext } from "../context/Mycontext";
import { ClubEdit } from "./clubs/ClubEdit";
import { DistrictCommities } from "./dis_Commity/Dis_Commities";
import { DisCommitiesMembers } from "./dis_CommityMember/Dis_commitiesMembers";
import DistrictEmployee from "./employee/Dis_Employee";
import { AddCommities } from "./dis_Commity/AddCommities";
import { AddCommityMember } from "./dis_CommityMember/AddCommityMember";
import { MemberEdit } from "./members/MemberEdit";
import { AddEmployee } from "./employee/AddEmployee";
import EmployeeDetails from "./employee/EmployeeDetails";
import EmployeeEdit from "./employee/EmployeeEdit";
import MyProfile from "./profile/MyProfile";
import AboutUs from "./AboutUs/AboutUs";
import Governor from "./Governor/Governor";
import { AboutUsEdit } from "./AboutUs/EditAboutUs";
import { GovernorEdit } from "./Governor/EditGoverner";
import GovernorHistory from "./Governor/GovernorHistory";
import AddGovernorHistory from "./Governor/AddGovernorHistory";
import EditGovernorHistory from "./Governor/EditGovernorHistory";
import { ClubMembersLayout } from "./members/ClubMembersLayout";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>

      <Route index element={<DistrictLayout />} />

      <Route path="clubLayout"  element={<ClubLayout />}  />
      <Route path="clubLayout/:clubId"   element={<ClubDetails />}  />
      <Route path="clubLayout/addClub" element={<AddClub />} />
      <Route path="clubLayout/clubEdit/:clubId" element={<ClubEdit />} />

      <Route path="membersLayout" element={<MembersLayout />} />
      <Route path="ClubmembersLayout" element={<ClubMembersLayout />} />
      <Route path="membersLayout/:id" element={<MemberDetails />} />
      <Route path="membersLayout/addMember" element={<AddMember />} />
      <Route path="membersLayout/memberEdit/:id" element={<MemberEdit />} />

      <Route path="districtEmployee" element={<DistrictEmployee />} />
      <Route path="districtEmployee/:id" element={<EmployeeDetails />} />
      <Route path="districtEmployee/addEmployee" element={<AddEmployee />} />
      <Route path="districtEmployee/employeeEdit/:id" element={<EmployeeEdit />} />

      <Route path="districtCommities" element={<DistrictCommities />} />
      <Route path="districtCommities/addCommity" element={<AddCommities />} />

      <Route path="districtCommitiesMembers" element={<DisCommitiesMembers />} />
      <Route path="districtCommitiesMembers/addCommityMember" element={<AddCommityMember />} />

      <Route path="myProfile" element={<MyProfile />} />

      <Route path="aboutUs" element={<AboutUs />} />
      <Route path="aboutUs/edit" element={<AboutUsEdit />} />

      <Route path="governor" element={<Governor />} />
      <Route path="governor/edit" element={<GovernorEdit />} />

      <Route path="governorHistory" element={<GovernorHistory />} />
      <Route path="governorHistory/add" element={<AddGovernorHistory />} />
      <Route path="governorHistory/edit/:id" element={<EditGovernorHistory />} />





      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const MainApp = () => {
  const { isLogedIn } = useContext(MyContext);
  return (
    <>
      {isLogedIn ? (
        <>
          <MyNavbar />
          <RouterProvider router={router} />
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default MainApp;
