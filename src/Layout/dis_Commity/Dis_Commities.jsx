import { Button, Table, TextInput, Select } from "flowbite-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../context/Mycontext";

export const DistrictCommities = () => {
  const { allCommities } = useContext(MyContext);
  return (
    <>
      <div className="flex flex-row justify-between items-center h-24">
        <h1>District Committees</h1>
        <Link to="addCommity">
          <Button>
            <h1>Add Committees</h1>
          </Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>
              <div className="flex items-center cursor-pointer">
                District Committees
              </div>
            </Table.HeadCell>
            <Table.HeadCell>
              <div className="flex items-center cursor-pointer">Name</div>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {allCommities.map((commity , index) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>

                <Table.Cell className="capitalize">{commity.name}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};
