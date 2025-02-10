import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../../context/Mycontext";
import defAvatar from "../../assets/default.png"

const EmployeeDetails = () => {
    const [employee, setEmployee] = useState();
    const { id } = useParams();
    const { accessToken } = useContext(MyContext);
    
    useEffect(() => {
      const fetchEmployee = async () => {
        try {
          const res = await fetch(`https://rotary.shakoush.xyz/users/user/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            setEmployee(data);
          } else {
            console.error("Error:", res.status);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
  
      fetchEmployee();
    }, [id, accessToken]);
  
  
    return (
      <div className="container">
      <div className="flex items-center">
      <img src={employee?.profileLink? employee.profileLink : defAvatar} className="mr-10 h-40 rounded-3xl" alt="Rotary" />
      <h2 className="text-2xl font-bold">{employee?.fullName} </h2>
    </div>
    <div className="flex flex-col mt-10">
      <div className="flex flex-row mb-5">
        <h1 className="w-28">Rotarian ID </h1>
        <h1 className="font-bold">:  {employee?.rotarianId}</h1>
      </div>

     
     
      <div className="flex flex-row mb-5">
        <h1 className="w-28">Role </h1>
        <h1 className="font-bold">:  {employee?.role}</h1>
      </div>

      <div className="flex flex-row mb-5">
        <h1 className="w-28">Club</h1>
        <h1 className="font-bold">:  {employee?.club?.name}</h1>
      </div>

      <div className="flex flex-row mb-5">
        <h1 className="w-28">About </h1>
        <h1 className="font-bold">:  {employee?.about}</h1>
      </div>
      <div className="flex flex-row mb-5">
        <h1 className="w-28">Mobile </h1>
        <h1 className="font-bold">:  {employee?.rotarianId}</h1>
      </div>
      <div className="flex flex-row mb-5">
        <h1 className="w-28">Email </h1>
        <h1 className="font-bold">:  {employee?.email}</h1>
      </div>
    
   </div>
  
  </div>
    );
}
 
export default EmployeeDetails;