import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/Mycontext";
import axios from "axios";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const Governor = () => {
  const { accessToken, refreshAccessToken } = useContext(MyContext);
  const [governor, setGovernor] = useState({});
  useEffect(() => {
    const fetchGovernor = async () => {
      try {
        const response = await axios.get(
          "https://rotary.shakoush.xyz/governor",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("About us", response.data);
        setGovernor(response.data);
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
    fetchGovernor();
  }, []);
  console.log("governor :>> ", governor);
  return (
    
    <div className="container">
      <div className="flex items-center mb-8">
        <img
          src={governor?.logo}
          className="mr-10 h-40 rounded-3xl"
          alt="Rotary"
        />
        <Link to="edit">
                  <Button>
                    <h1>Edit governor</h1>
                  </Button>
                </Link>
      </div>
      <div className="flex flex-row mb-5">
        <h1 className="w-28">About </h1>
        <h1 className="font-bold">: {governor?.title}</h1>
      </div>
      <div className="flex flex-col mt-10">
        <div className="flex flex-row mb-5">
          <h1 className="w-28">Address </h1>
          <h1 className="font-bold">: {governor?.description}</h1>
        </div>
      </div>
    </div>
  );
};

export default Governor;
