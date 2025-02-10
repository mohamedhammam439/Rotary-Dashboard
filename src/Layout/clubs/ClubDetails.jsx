import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../../context/Mycontext";
import Logo from '../../assets/profile1.jpg'


export const ClubDetails = () => {
  const { clubId } = useParams();
  const [club, setClub] = useState({});
  const { accessToken } = useContext(MyContext);

    
  
useEffect(() => {
    const fetchClub = async () => {
      try {
        const res = await fetch(`https://rotary.shakoush.xyz/clubs/${clubId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setClub(data);
        } else {
          console.error("Error:", res.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchClub();
  }, [clubId, accessToken]);
  console.log('club now :>> ', club);
  console.log('clubId :>> ', clubId);
  return (
    <div className="container">
      <div className="flex items-center">
        <img src={club?.logo} className="mr-10 h-40 rounded-3xl" alt="Rotary" />
        <h2 className="text-2xl font-bold">{club?.name} </h2>
      </div>
      <div className="flex flex-row mb-5">
          <h1 className="w-28">About </h1>
          <h1 className="font-bold">:  {club?.about}</h1>
        </div>
      <div className="flex flex-col mt-10">
        <div className="flex flex-row mb-5">
          <h1 className="w-28">Address </h1>
          <h1 className="font-bold">:  {club?.location}</h1>
        </div>

        <div className="flex flex-row mb-5">
          <h1 className="w-28">City </h1>
          <h1 className="font-bold">:  {club?.city}</h1>
        </div>
       
      
        <div className="flex flex-row mb-5">
          <h1 className="w-28">Dashboard</h1>
          <h1 className="font-bold">:  {club?.dashboard}</h1>
        </div>

        <div className="flex flex-row mb-5">
          <h1 className="w-28">Drive</h1>
          <h1 className="font-bold">:  {club?.drive}</h1>
        </div>

        <div className="flex flex-row mb-5">
          <h1 className="w-28">Meeting Time</h1>
          <h1 className="font-bold">:  {club?.meetingTime}</h1>
        </div>

        <div className="flex flex-col mb-5">
          <h1 className="w-28">All Events </h1>
          {club?.events?.map((event)=> (
            <h1 key={event._id} className="font-bold flex ml-5"> {event.title}</h1>

          ))}
        </div>

        <div className="flex flex-col mb-5">
          <h1 className="w-28">All Members </h1>
          {club?.users?.map((user)=> (
            <h1 key={user._id} className="font-bold flex ml-5"> {user.fullName}</h1>

          ))}
        </div>

     </div>
    </div>
  );
};

