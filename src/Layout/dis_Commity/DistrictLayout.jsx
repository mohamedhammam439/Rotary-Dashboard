import { Table } from "flowbite-react";
export const DistrictLayout =()=>(
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>District</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">

          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">

            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              District 2451
            </Table.Cell>
            
            <Table.Cell>Egypt</Table.Cell>
          </Table.Row>
       
        </Table.Body>
      </Table>
    </div>
)