import { Button, Table, Select, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiChevronUp, HiChevronDown } from "react-icons/hi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

import { MyContext } from "../../context/Mycontext";
import ImportModal from "./importingModal";
import Cookies from "js-cookie";


export const ClubLayout = () => {
  const [sortedFiled, setSortedFiled] = useState(null);
  const [sortDirection, setSortDirection] = useState("desc");

  const [searchedVal, setSearchedVal] = useState("");
  const [searchedItem, setSearchedItem] = useState("name");

  const [openModal, setOpenModal] = useState(false);

  const [displayedRowCount, setDisplayedRowCount] = useState(10);
  const rowsToLoad = 5;

  const { allClubs, DeleteClub } = useContext(MyContext);
  const Clubs = allClubs;
  const navigate = useNavigate();
  const goRouteId = (clubId) => navigate(`/clubLayout/${clubId}`);
  const goRouteEditId = (clubId) => navigate(`/clubLayout/clubEdit/${clubId}`);

  const role = Cookies.get('role')

  const getSortedArray = (data) => {
    let sortedArray = Array.isArray(data) ? [...data] : [];
    if (sortedFiled) {
      sortedArray.sort((a, b) => {
        if (a[sortedFiled] < b[sortedFiled]) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (a[sortedFiled] > b[sortedFiled]) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortedArray;
  };

  const handleHeaderClick = (field) => {
    if (field === sortedFiled) {
      // If the same header is clicked, toggle the sort direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // If a different header is clicked, set the new sorted field and default to ascending order
      setSortedFiled(field);
      setSortDirection("asc");
    }
  };

  const handleSearch = (e) => {
    setSearchedVal(e.target.value);
  };
  const handelSelect = (e) => {
    setSearchedItem(e.target.value);
  };

  const handleLoadMore = () => {
    setDisplayedRowCount((prevCount) => prevCount + rowsToLoad);
  };

  const VisibleClubs = getSortedArray(Clubs).slice(0, displayedRowCount);
console.log('Clubs length :>> ', Clubs.length);
  return (
    <>
      <div className="flex flex-row justify-between items-center h-24">
        <h1 className="font-bold">Clubs</h1>
        <div className="flex gap-1 items-center">
          <Select id="role" required onChange={handelSelect} className="w-28">
            <option value="">Search by</option>
            <option value="name">Club</option>
            <option value="location">Location</option>
            <option value="district">Distrect</option>
          </Select>
          <TextInput
            type="text"
            placeholder="Search"
            className="w-72"
            onChange={handleSearch}
          />
        </div>
        {role === 'clubAdmin' ? '' : <> <Button onClick={() => setOpenModal(true)}>
            <h1>Import Clubs</h1>
          </Button>
        <Link to="addClub">
          <Button>
            <h1>Add Clubs</h1>
          </Button>
        </Link></> }
       
      </div>
      <ImportModal openModal={openModal} setOpenModal={setOpenModal} />
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell onClick={() => handleHeaderClick("clubId")}>
              <div className="flex items-center cursor-pointer">
                Club ID
                {sortedFiled === "clubId" && (
                  <span>
                    {sortDirection === "asc" ? (
                      <HiChevronDown size={20} />
                    ) : (
                      <HiChevronUp size={20} />
                    )}
                  </span>
                )}
              </div>
            </Table.HeadCell>
            <Table.HeadCell onClick={() => handleHeaderClick("name")}>
              <div className="flex items-center cursor-pointer">
                 Club Name ({Clubs.length})
                {sortedFiled === "name" && (
                  <span>
                    {sortDirection === "asc" ? (
                      <HiChevronDown size={20} />
                    ) : (
                      <HiChevronUp size={20} />
                    )}
                  </span>
                )}
              </div>
            </Table.HeadCell>
            <Table.HeadCell onClick={() => handleHeaderClick("location")}>
              <div className="flex items-center cursor-pointer">
                Location
                {sortedFiled === "location" && (
                  <span>
                    {sortDirection === "asc" ? (
                      <HiChevronDown size={20} />
                    ) : (
                      <HiChevronUp size={20} />
                    )}
                  </span>
                )}
              </div>
            </Table.HeadCell>
            <Table.HeadCell onClick={() => handleHeaderClick("district")}>
              <div className="flex items-center cursor-pointer">
                District
                {sortedFiled === "district" && (
                  <span>
                    {sortDirection === "asc" ? (
                      <HiChevronDown size={20} />
                    ) : (
                      <HiChevronUp size={20} />
                    )}
                  </span>
                )}
              </div>
            </Table.HeadCell>
            <Table.HeadCell>Functions</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {VisibleClubs.filter(
              (row) =>
                // note that I've incorporated the searchedVal length check here
                !searchedVal.length ||
                row[searchedItem]
                  ?.toString()
                  .toLowerCase()
                  .includes(searchedVal.toString().toLowerCase())
            ).map((club) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                key={club._id}
              >
                 <Table.Cell onClick={() => goRouteId(club.clubId)}>
                  {club.clubId}
                </Table.Cell>
                <Table.Cell
                  onClick={() => goRouteId(club.clubId)}
                  className="flex items-center gap-3 whitespace-nowrap font-medium text-gray-900 dark:text-white"
                >
                  {/* <img src={club?.logo} className="h-10 w-10 rounded-full"/> */}
                  {club.name}
                </Table.Cell>

                <Table.Cell onClick={() => goRouteId(club.clubId)}>
                  {club.location}
                </Table.Cell>
                <Table.Cell onClick={() => goRouteId(club.clubId)}>
                  {club.district}
                </Table.Cell>
                <Table.Cell className="flex items-center justify-start">
                  <FiEdit
                    color="#0e7490"
                    onClick={() => goRouteEditId(club.clubId)}
                    className="mr-8"
                  />
                  <RiDeleteBin6Fill
                    color="red"
                    onClick={() => DeleteClub(club.clubId)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          {displayedRowCount < Clubs.length && (
            <div className="flex justify-center mt-4">
              <Button onClick={handleLoadMore}>Load More</Button>
            </div>
          )}
        </Table>
      </div>
    </>
  );
};
