import { Button, Label, TextInput, Select } from "flowbite-react";
import { Formik } from "formik";
import { AddMemberSchema } from "../../schema";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { MyContext } from "../../context/Mycontext";
import { useNavigate } from "react-router-dom";
import MultiSelectComponent from "../../components/MultiSelect";

export const AddEmployee = () => {
  const [showCommity, setShowCommity] = useState(false);
  const {accessToken , allClubs , fetchAllEmployee} = useContext(MyContext)
  const navigate = useNavigate()
  const Clubs = allClubs
  const AddEmployee = async (employee) => {
   await axios
      .post("https://rotary.shakoush.xyz/users/add-user", employee, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Item added successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
      });
  };
  return (
    <>
      <h1 className="text-3xl font-bold">Add Employee</h1>
      <div className="flex flex-row px-5 py-10">
        <Formik
          initialValues={{
            fullName: "",
            rotarianId: "",
            role: "clubAdmin",
            clubId: "",
            email: "",
            password: "",
            isEmployee: true,
          }}
          // validationSchema={AddMemberSchema}
          onSubmit={async(values, actions) => (
            await AddEmployee(values),
            fetchAllEmployee(),
            actions.resetForm(),
            navigate('/districtEmployee')
          )}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-row justify-between mb-5">
              <div className="flex flex-row ">
                <div className="flex flex-row flex-wrap items-center">
                  <div className="mb-2 w-32 ">
                    <Label htmlFor="fullName" value="Full Name" />
                  </div>
                  <div>
                    <TextInput
                      id="fullName"
                      type="text"
                      placeholder="Full Name"
                      className="w-72"
                      value={values.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      autoCapitalize
                      color={
                        errors.fullName && touched.fullName ? "failure" : ""
                      }
                      helperText={
                        errors.fullName && touched.fullName ? (
                          <p className="text-xs ">{errors.fullName}</p>
                        ) : (
                          ""
                        )
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-row flex-wrap items-center	">
                  <div className="mb-2 w-32 ">
                    <Label htmlFor="rotarianId" value="EmployeeID" />
                  </div>
                  <div>
                    <TextInput
                      id="rotarianId"
                      type="number"
                      placeholder="Mobile + ClubId"
                      required
                      className="w-72"
                      value={values.rotarianId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      color={
                        errors.rotarianId && touched.rotarianId
                          ? "failure"
                          : ""
                      }
                      helperText={
                        errors.rotarianId && touched.rotarianId ? (
                          <p className="text-xs ">{errors.rotarianId}</p>
                        ) : (
                          ""
                        )
                      }
                    />
                  </div>
                </div>
              </div>

            
            </div>
          
            <div className="flex flex-row justify-between mb-5">
              <div className="flex flex-row">
                <div className="flex flex-row flex-wrap items-center	">
                  <div className="mb-2 w-32 ">
                    <Label htmlFor="clubId" value="Club" />
                  </div>
                  <div>
                    <Select
                      id="clubId"
                      required
                      value={values.clubId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-72"
                      color={errors.clubId && touched.clubId ? "failure" : ""}
                      helperText={
                        errors.clubId && touched.clubId ? (
                          <p className="text-xs ">{errors.clubId}</p>
                        ) : (
                          ""
                        )
                      }
                    >
                      <option value="">Select</option>
                      {Clubs.map((club, index) => (
                        <option key={index} value={club.clubId}>
                          {club.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className="flex flex-row flex-wrap items-center	">
                  <div className="mb-2 w-32 ">
                    <Label htmlFor="password" value="Password" />
                  </div>
                  <div>
                    <TextInput
                      id="password"
                      type="number"
                      placeholder="Member ID"
                      required
                      className="w-72"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      color={
                        errors.password && touched.password
                          ? "failure"
                          : ""
                      }
                      helperText={
                        errors.password && touched.password ? (
                          <p className="text-xs ">{errors.password}</p>
                        ) : (
                          ""
                        )
                      }
                    />
                  </div>
                </div>
              </div>
             
             
            </div>

              <div className="flex flex-row">
               
                <div className="flex flex-row flex-wrap items-center	">
                  <div className="mb-2 w-32 ">
                    <Label htmlFor="email" value="Email" />
                  </div>
                  <div>
                    <TextInput
                      id="email"
                      type="email"
                      placeholder="email"
                      required
                      className="w-72"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      color={
                        errors.email && touched.email
                          ? "failure"
                          : ""
                      }
                      helperText={
                        errors.email && touched.email ? (
                          <p className="text-xs ">{errors.email}</p>
                        ) : (
                          ""
                        )
                      }
                    />
                  </div>
              </div>
           
             
            </div>
             
            <Button type="submit" className="mt-10 w-72 self-center	">
              Submit
            </Button>
          </form>
          )}
        </Formik>
      </div>
    </>
  );
};
