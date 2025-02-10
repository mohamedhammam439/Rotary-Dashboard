import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/Mycontext";
import axios from "axios";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const { accessToken, refreshAccessToken } = useContext(MyContext);
  const [aboutUs, setAboutUs] = useState({});
  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const response = await axios.get(
          "https://rotary.shakoush.xyz/about-us",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("About us", response.data);
        setAboutUs(response.data);
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
    fetchAboutUs();
  }, []);
  console.log("aboutUs :>> ", aboutUs);
  return (
    
    <div className="container">
      <div className="flex items-center mb-8">
        <img
          src={aboutUs?.logo}
          className="mr-10 h-40 rounded-3xl"
          alt="Rotary"
        />
        <Link to="edit">
                  <Button>
                    <h1>Edit AboutUs</h1>
                  </Button>
                </Link>
      </div>
      <div className="flex flex-row mb-5">
        <h1 className="w-28">About </h1>
        <h1 className="font-bold">: {aboutUs?.title}</h1>
      </div>
      <div className="flex flex-col mt-10">
        <div className="flex flex-row mb-5">
          <h1 className="w-28">Address </h1>
          <h1 className="font-bold">: {aboutUs?.description}</h1>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
