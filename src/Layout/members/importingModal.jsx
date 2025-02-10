
import { Button, Modal } from "flowbite-react";
import { useContext, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { MyContext } from "../../context/Mycontext";
import * as XLSX from 'xlsx';
import axios from "axios";


export default function ImportModal({setOpenModal , openModal}) {
  const {fetchAllUsers , accessToken , refreshAccessToken} = useContext(MyContext)
  const [data, setData] = useState(null);

  // Function to show a loader
const showLoader = () => {
  // Show loader logic here
  console.log('Loader is displayed');
};

// Function to hide the loader
const hideLoader = () => {
  // Hide loader logic here
  console.log('Loader is hidden');
};

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);
      console.log('sheetData :>> ', sheetData.length);
  
      setData(sheetData);
  
      // Track the number of members added
      let membersAdded = 0;
  
      // Function to add a member and update the loader visibility
      const addMemberAndUpdateLoader = (member) => {
        AddMemberk(member);
        membersAdded++;
  
        // Check if all members are added
       
      };
  
      // Add each member with loader control
      sheetData.forEach(member => {
        addMemberAndUpdateLoader(member);
        if (membersAdded === sheetData.length) {
          console.log('Finished adding members.'); // Log when finished adding members
          fetchAllUsers(); // Fetch all users after adding members
          setOpenModal(false)
        }
      });
      
    };
  
    reader.readAsArrayBuffer(file);
  };
  
    const AddMemberk = async (member) => {
      await axios
         .post("https://rotary.shakoush.xyz/users/add-user", member, {
           headers: {
             Authorization: `Bearer ${accessToken}`,
           },
         })
         .then((response) => {
           console.log("Item added successfully:", response.data);
           
         })
         .catch((error) => {
          if (error.response && error.response.status === 401) {
            // Access token expired, try refreshing it
            refreshAccessToken();
          } else {
            // Handle other errors
            console.error(error);
          }
         }
        );
     };
  return (
    <>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to Import Members
            </h3>
            <input type="file" onChange={handleFileUpload} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
