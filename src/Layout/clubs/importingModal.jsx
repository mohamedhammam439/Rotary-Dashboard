import { Button, Modal } from "flowbite-react";
import { useContext, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { MyContext } from "../../context/Mycontext";
import * as XLSX from 'xlsx';

export default function ImportModal({ setOpenModal, openModal }) {
  const { fetchAllClubs, accessToken, refreshAccessToken } = useContext(MyContext);
  const [data, setData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // State to hold the selected file

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file); // Save the selected file for later use
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);
      console.log('sheetData :>> ', sheetData.length);

      setData(sheetData);

      let membersAdded = 0;

      const addMemberAndUpdateLoader = async (member) => {
        await AddClubForm(member);
        membersAdded++;

        if (membersAdded === sheetData.length) {
          console.log('Finished adding members.');
          fetchAllClubs();
          setOpenModal(false);
        }
      };

      sheetData.forEach(member => {
        addMemberAndUpdateLoader(member);
      });
    };

    reader.readAsArrayBuffer(file);
  };

  const AddClubForm = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("clubId", values.clubId);
      formData.append("location", values.location);
      formData.append("about", values.about);
      formData.append("city", values.city);
      formData.append("dashboard", values.dashboard);
      formData.append("drive", values.drive);
      formData.append("meetingTime", values.meetingTime);
      formData.append("district", values.district);

      if (selectedFile) {
        formData.append("file", selectedFile); // Append the file from state
      }

      for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); // Debug to see FormData content
      }

      const res = await fetch(
        `https://rotary.shakoush.xyz/clubs/import-clubs`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log("Club Added successfully", data);
      } else {
        console.error("Error in Adding", res.status);
        const errorText = await res.text();
        console.error("Error detail:", errorText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
