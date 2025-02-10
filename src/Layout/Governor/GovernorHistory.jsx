import axios from "axios";
import { Button, Table, TextInput, Select, Modal } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../context/Mycontext";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { HiOutlineExclamationCircle } from "react-icons/hi";
const GovernorHistory = () => {
  const { dataGovernorHistory , DeleteGovernor} = useContext(MyContext);
  const navigate = useNavigate();
  const [openDelModal, setOpenDelModal] = useState(false);
  const [deleteMemberId, setDeleteMemberId] = useState(null);
  const goRouteEditId = (id) => navigate(`/governorHistory/edit/${id}`);

  const handleDeleteClick = (id) => {
    setDeleteMemberId(id);
    setOpenDelModal(true);
  };

  const confirmDelete = () => {
    DeleteGovernor(deleteMemberId);
    setOpenDelModal(false);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center h-24">
        <h1>Governor History</h1>
        <Link to="add">
          <Button>
            <h1>Add Governor</h1>
          </Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Num</Table.HeadCell>
            <Table.HeadCell>Img</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Year</Table.HeadCell>
            <Table.HeadCell>Functions</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {dataGovernorHistory.map((governor, index) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>

                <Table.Cell>
                  {" "}
                  <img
                    src={governor?.logo}
                    className="h-10 w-10 rounded-full"
                  />
                </Table.Cell>
                <Table.Cell>
                  {governor.title}.{governor.fullName}
                </Table.Cell>
                <Table.Cell>{governor.year}</Table.Cell>
                <Table.Cell className="flex items-center justify-start">
                  <FiEdit
                    color="#0e7490"
                    onClick={() => goRouteEditId(governor._id)}
                    className="mr-8"
                  />
                  <RiDeleteBin6Fill
                    color="red"
                    onClick={() => handleDeleteClick(governor._id)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
       <Modal show={openDelModal} size="md" onClose={() => setOpenDelModal(false)} popup>
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this member?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={confirmDelete}
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                     Delete
                    </button>
                    <button
                      onClick={() => setOpenDelModal(false)}
                      className="bg-gray-600 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
    </>
  );
};

export default GovernorHistory;
