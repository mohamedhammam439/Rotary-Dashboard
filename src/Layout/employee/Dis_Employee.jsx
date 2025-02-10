import { Button, Table, TextInput, Select } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiChevronUp, HiChevronDown } from "react-icons/hi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import { MyContext } from "../../context/Mycontext";

const DistrictEmployee = () => {
  const [sortedFiled, setSortedFiled] = useState(null);
  const [sortDirection, setSortDirection] = useState("desc");

  const [searchedVal, setSearchedVal] = useState("");
  const [searchedItem, setSearchedItem] = useState("fullName");

  const [selectedClub, setSelectedClub] = useState("");
  const [Clubs, setClubs] = useState([]);

  const [displayedRowCount, setDisplayedRowCount] = useState(10);
  const rowsToLoad = 5;

  const { DeletUser, accessToken , allEmployees , profile} = useContext(MyContext);
  const Members = allEmployees;

  const navigate = useNavigate();
  const goRouteId = (id) => navigate(`/districtEmployee/${id}`);
  const goRouteEditId = (id) =>
    navigate(`/districtEmployee/employeeEdit/${id}`);
  useEffect(() => {
    axios
      .get("https://rotary.shakoush.xyz/clubs/all", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => setClubs(res.data.clubs));
  }, []);

  const getSortedArray = (data) => {
    let sortedArray = [...data]; // Create a copy of the original array to avoid modifying it directly
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

  const handelClubSelect = (e) => {
    setSelectedClub(e.target.value);
  };

  const filteredClub = Members.filter(
    (member) => member.club?.name === selectedClub
  );

  const visibleMembers = getSortedArray(Members).slice(0, displayedRowCount);
  const visibleClubMembers = filteredClub.slice(0, displayedRowCount);

  return (
    <>
      <div className="flex flex-row justify-between items-center h-24">
        <h1 className="font-bold">Employees</h1>
        <div className="flex gap-1 items-center">
          <Select id="role" required onChange={handelSelect} className="w-28">
            <option value="fullName">Search by</option>
            <option value="fullName">Name</option>
            <option value="rotarianId">ID</option>
          </Select>
          <TextInput
            type="text"
            placeholder="Search"
            className="w-72"
            onChange={handleSearch}
          />
        </div>

        <Select
          id="role"
          placeholder="select"
          onChange={handelClubSelect}
          className="w-28"
        >
          <option value="">All</option>
          {Clubs.map((club) => (
            <option className="capitalize" key={club._id} value={club.name}>
              {club.name}
            </option>
          ))}
        </Select>
        {profile.role === 'admin' ?  <Link to="addEmployee">
          <Button>
            <h1>Add Employee</h1>
          </Button>
        </Link> : '' }
       
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell onClick={() => handleHeaderClick("rotarianId")}>
              <div className="flex items-center cursor-pointer">
                Mobile (ID)
                {sortedFiled === "rotarianId" && (
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
            <Table.HeadCell onClick={() => handleHeaderClick("fullName")}>
              <div className="flex items-center cursor-pointer">
                Employee Name
                {sortedFiled === "fullName" && (
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
            <Table.HeadCell onClick={() => handleHeaderClick("club")}>
              <div className="flex items-center cursor-pointer">
                Club
                {sortedFiled === "club" && (
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
            <Table.HeadCell onClick={() => handleHeaderClick("isAdmin")}>
              <div className="flex items-center cursor-pointer">
                App Role
                {sortedFiled === "isAdmin" && (
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
          {selectedClub ? (
            <>
              <Table.Body className="divide-y">
                {visibleClubMembers
                  .filter(
                    (row) =>
                      // note that I've incorporated the searchedVal length check here
                      !searchedVal.length ||
                      row[searchedItem]
                        ?.toString()
                        .toLowerCase()
                        .includes(searchedVal.toString().toLowerCase())
                  )
                  .map((member) =>(
                    <Table.Row
                      key={member._id}
                      onClick={() => goRouteId(member._id)}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        0{member.rotarianId}
                      </Table.Cell>

                      <Table.Cell className="capitalize">
                        {member.fullName}
                      </Table.Cell>
                      {/* do something here */}
                      <Table.Cell className="capitalize">
                      {member.club?.name}
                      </Table.Cell>
                      <Table.Cell className="capitalize">
                        {member.role}
                      </Table.Cell>
                      <Table.Cell className="flex items-center justify-start">
                        <FiEdit
                          color="#0e7490"
                          onClick={() => goRouteEditId(member._id)}
                          className="mr-8"
                        />
                        <RiDeleteBin6Fill
                          color="red"
                          onClick={() => DeletUser(member._id)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
              {displayedRowCount < filteredClub.length && (
                <div className="flex justify-center mt-4">
                  <Button onClick={handleLoadMore}>Load More</Button>
                </div>
              )}
            </>
          ) : (
            <>
              <Table.Body className="divide-y">
                {visibleMembers
                  .filter(
                    (row) =>
                      // note that I've incorporated the searchedVal length check here
                      !searchedVal.length ||
                      row[searchedItem]
                        ?.toString()
                        .toLowerCase()
                        .includes(searchedVal.toString().toLowerCase())
                  )
                  .map((member) => (
                    <Table.Row
                      key={member._id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                    >
                      <Table.Cell
                        onClick={() => goRouteId(member._id)}
                        className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                      >
                        0{member.rotarianId}
                      </Table.Cell>

                      <Table.Cell
                        onClick={() => goRouteId(member._id)}
                        className="capitalize"
                      >
                        {member.fullName}
                      </Table.Cell>
                      <Table.Cell
                        onClick={() => goRouteId(member._id)}
                        className="capitalize"
                      >
                        {member.club?.name}
                      </Table.Cell>
                      <Table.Cell
                        onClick={() => goRouteId(member._id)}
                        className="capitalize"
                      >
                        {member.role}
                      </Table.Cell>
                      <Table.Cell className="flex items-center justify-start">
                        <FiEdit
                          color="#0e7490"
                          onClick={() => goRouteEditId(member._id)}
                          className="mr-8"
                        />
                        <RiDeleteBin6Fill
                          color="red"
                          onClick={() => DeletUser(member._id)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
              {displayedRowCount < Members.length && (
                <div className="flex justify-center mt-4">
                  <Button onClick={handleLoadMore}>Load More</Button>
                </div>
              )}
            </>
          )}
        </Table>
      </div>
    </>
  );
};

export default DistrictEmployee;
