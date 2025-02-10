import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../../context/Mycontext";
import defAvatar from "../../assets/default.png"
import moment from "moment";

export const MemberDetails = () => {
  const [member, setMember] = useState();
  const { id } = useParams();
  const { accessToken } = useContext(MyContext);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://rotary.shakoush.xyz/users/user/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setMember(data);
        } else {
          console.error("Error:", res.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUser();
  }, [id, accessToken]);


  return (
    <div className="container">
        <div className="flex items-center">
        <img src={member?.profileLink? member.profileLink : defAvatar} className="mr-10 h-40 rounded-3xl" alt="Rotary" />
        <h2 className="text-2xl font-bold">{member?.fullName} </h2>
      </div>
      <div className="flex flex-col mt-10">
        <div className="flex flex-row mb-5">
          <h1 className="w-28">Rotarian ID </h1>
          <h1 className="font-bold">:  {member?.rotarianId}</h1>
        </div>

        <div className="flex flex-row mb-5">
          <h1 className="w-28">Job </h1>
          <h1 className="font-bold">:  {member?.job}</h1>
        </div>

       
        <div className="flex flex-row mb-5">
          <h1 className="w-28">Role </h1>
          <h1 className="font-bold">:  {member?.role}</h1>
        </div>

        <div className="flex flex-row mb-5">
          <h1 className="w-28">Club</h1>
          <h1 className="font-bold">:  {member?.club?.name}</h1>
        </div>

        <div className="flex flex-row mb-5">
          <h1 className="w-28">Club Role</h1>
          <h1 className="font-bold">:  {member?.clubRole}</h1>
        </div>

        <div className="flex flex-row mb-5">
          <h1 className="w-28">Incoming Position</h1>
          <h1 className="font-bold">:  {member?.incomingPosition}</h1>
        </div>

        <div className="flex flex-row mb-5">
          <h1 className="w-28">Past Position</h1>
          <h1 className="font-bold">:  {member?.lastPosition}</h1>
        </div>

        <div className="flex flex-row mb-5">
          <h1 className="w-28">About </h1>
          <h1 className="font-bold">:  {member?.about}</h1>
        </div>
        <div className="flex flex-row mb-5">
          <h1 className="w-28">Mobile </h1>
          <h1 className="font-bold">:  {member?.mobile}</h1>
        </div>
        <div className="flex flex-row mb-5">
          <h1 className="w-28">Email </h1>
          <h1 className="font-bold">:  {member?.email}</h1>
        </div>
        <div className="flex flex-row mb-5">
          <h1 className="w-28">Facebook </h1>
          <h1 className="font-bold">:  {member?.facebook}</h1>
        </div>
        <div className="flex flex-row mb-5">
          <h1 className="w-28">Instagram </h1>
          <h1 className="font-bold">:  {member?.Instagram}</h1>
        </div>
        <div className="flex flex-row mb-5">
          <h1 className="w-28">LinkedIn </h1>
          <h1 className="font-bold">:  {member?.linkedin}</h1>
        </div>
        <div className="flex flex-row mb-5">
          <h1 className="w-28">Birthday </h1>
          <h1 className="font-bold">:{member?.birthDate ? moment(member?.birthDate).format("DD /MM /YY") : <span>   *******</span>}</h1>
        </div>
       
     </div>
    
    </div>
  );
};
