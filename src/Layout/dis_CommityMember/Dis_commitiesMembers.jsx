import { Button, Table, TextInput, Select } from "flowbite-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../context/Mycontext";

export const DisCommitiesMembers = () => {
  const { allCommityMember } = useContext(MyContext);
  return (
    <>
      <div className="flex flex-row justify-between items-center h-24">
        <h1>District Committee Members</h1>
        <Link to="addCommityMember">
          <Button>
            <h1>Add Committee Members</h1>
          </Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>
              <div className="flex items-center cursor-pointer">Number</div>
            </Table.HeadCell>
            <Table.HeadCell>
              <div className="flex items-center cursor-pointer">Member</div>
            </Table.HeadCell>
            <Table.HeadCell>
              <div className="flex items-center cursor-pointer">
                Committee Name
              </div>
            </Table.HeadCell>
            <Table.HeadCell>
              <div className="flex items-center cursor-pointer">Role</div>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {allCommityMember.map((member , index) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>

                <Table.Cell className="capitalize">{member.user.fullName}</Table.Cell>
                <Table.Cell className="capitalize"> {member.commity.name}</Table.Cell>
                <Table.Cell className="capitalize"> {member.role}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};
