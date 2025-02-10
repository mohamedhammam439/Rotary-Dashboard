import { useEffect, useState } from "react";
import { MyContext } from "./Mycontext";
import axios from "axios";
import Cookies from 'js-cookie';


export const ProviderContext = ({ children }) => {
  const [isLogedIn, setIsLogedIn] = useState(false);

  const [allusers, setAllusers] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [allClubs, setAllClubs] = useState([]);
  const [allCommities, setAllCommities] = useState([]);
  const [allCommityMember, setAllCommityMember] = useState([]);
  const [dataGovernorHistory, setDataGovernorHistory] = useState([]);


  const [profile, setProfile] = useState({});

  // const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const accessToken = Cookies.get('accessToken')

  const getAccessToken = async (values) => {
   
      try {
        const response = await axios.post(
          "https://rotary.shakoush.xyz/users/login",
          {
            email: values.email,
            password: values.password,
          }
        );
  
        const { accessToken, refreshToken } = response.data;
        Cookies.set('accessToken', accessToken);
        Cookies.set('refreshToken', refreshToken);
       
        // setAccessToken(accessToken);
        // setRefreshToken(refreshToken);
        setIsLogedIn(true);
      } catch (error) {
        console.error(error);
      }
  
  };

  const refreshAccessToken = async () => {
    const refreshToken = Cookies.get('refreshToken');
    try {
      const response = await axios.post(
        "https://rotary.shakoush.xyz/users/refresh-token",
        null,
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      const newAccessToken = response.data.accessToken;
      // setAccessToken(newAccessToken);
      Cookies.set('accessToken', newAccessToken);
    } catch (error) {
      console.error(error);
    }
  };

  // fetch all users from database
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(
        "https://rotary.shakoush.xyz/users/all-users",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            isEmployee: false,
          },
        }
      );
      setAllusers(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Access token expired, try refreshing it
        refreshAccessToken();
      } else {
        console.error(error);
      }
    }
  };

  const fetchAllEmployee = async () => {
    try {
      const response = await axios.get(
        "https://rotary.shakoush.xyz/users/all-users",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            isEmployee: true,
          },
        }
      );
      setAllEmployees(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Access token expired, try refreshing it
        refreshAccessToken();
      } else {
        console.error(error);
      }
    }
  };

  const fetchMyProfile = async () => {
    try {
      const response = await axios.get("https://rotary.shakoush.xyz/users/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("My profile", response.data);
      Cookies.set('role', response.data.role);
      Cookies.set('clubName', response.data.club.name);
      setProfile(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Access token expired, try refreshing it
        refreshAccessToken();
      } else {
        // Handle other errors
        console.error(error);
      }
    }
  };

  const fetchAllClubs = async () => {
    try {
      const response = await axios.get("https://rotary.shakoush.xyz/clubs/all", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setAllClubs(response.data.clubs);
      console.log('All clubs fetched :>> ');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        refreshAccessToken();
      } else {
        console.error(error);
      }
    }
  };

  const fetchCommity = async () => {
    try {
      const response = await axios.get("https://rotary.shakoush.xyz/commities", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setAllCommities(response.data.commitiess);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        refreshAccessToken();
      } else {
        console.error(error);
      }
    }
  };

  const fetchCommityMembers = async () => {
    try {
      const response = await axios.get(
        "https://rotary.shakoush.xyz/commity-members",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setAllCommityMember(response.data.commityMembers);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        refreshAccessToken();
      } else {
        console.error(error);
      }
    }
  };

  const DeleteClub = async (id) => {
    console.log("DeletClub:>> ", id);
    try {
      await fetch(`https://rotary.shakoush.xyz/clubs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      fetchAllClubs();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Access token expired, try refreshing it
        refreshAccessToken();
      } else {
        console.error(error);
      }
    }
  };
  const DeleteGovernor = async (id) => {
    console.log("DeletClub:>> ", id);
    try {
      await fetch(`https://rotary.shakoush.xyz/governor-history/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      fetchGovernorHistory();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Access token expired, try refreshing it
        refreshAccessToken();
      } else {
        console.error(error);
      }
    }
  };
  const DeletUser = async (id) => {
    console.log("DeletUser:>> ", id);
    try {
      await fetch(`https://rotary.shakoush.xyz/users/delete-user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      fetchAllUsers();
      fetchAllEmployee();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Access token expired, try refreshing it
        refreshAccessToken();
      } else {
        console.error(error);
      }
    }
  };
  const fetchGovernorHistory = async () => {
    try {
      const response = await axios.get(
        "https://rotary.shakoush.xyz/governor-history",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setDataGovernorHistory(response.data.governorHistory);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Access token expired, try refreshing it
        refreshAccessToken();
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchAllUsers();
    fetchAllEmployee();
    fetchAllClubs();
    fetchMyProfile();
    fetchCommity();
    fetchCommityMembers();
    fetchGovernorHistory()
  }, [isLogedIn]);

  return (
    <MyContext.Provider
      value={{
        isLogedIn,
        setIsLogedIn,
        allusers,
        accessToken,
        refreshToken,
        // setAccessToken,
        setRefreshToken,
        allClubs,
        fetchAllClubs,
        fetchAllUsers,
        DeleteClub,
        DeletUser,
        allCommities,
        fetchCommity,
        allCommityMember,
        fetchCommityMembers,
        allEmployees,
        fetchAllEmployee,
        getAccessToken,
        profile,
        fetchGovernorHistory,
        dataGovernorHistory,
        DeleteGovernor
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
