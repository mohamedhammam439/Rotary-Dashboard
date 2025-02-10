import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MyContext } from "../../context/Mycontext";
import { Formik } from "formik";
import { Button, Label, Select, TextInput } from "flowbite-react";


const EmployeeEdit = () => {

    const { id } = useParams();
    const [member, setMember] = useState();
    const { accessToken , fetchAllEmployee , allClubs} = useContext(MyContext);
    const navigate = useNavigate()
  
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await fetch(`https://rotary.shakoush.xyz/users/user/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            setMember(data);
          } else {
            console.error("Error:", res.status);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
  
      fetchUser();
    }, [id, accessToken]);
  
    const handelEdit = async (values) => {
      try {
        const res = await fetch(`https://rotary.shakoush.xyz/users/update-user/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          console.log('Member updated successfully' , res);
          fetchAllEmployee()
          // Redirect or perform any other action after successful update
        } else {
          console.error('Error: in updating', res.status);
          // Handle the error scenario
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle the error scenario
      }
    };
    return (
        <>
        <h1 className="text-3xl font-bold">Edit Employee</h1>
        {member?   <div className="flex flex-row px-5 py-10">
          <Formik
            initialValues={{
              fullName: member.fullName,
              rotarianId: member.rotarianId,
              role: member.role,
              clubId: member.club._id,
            }}
            // validationSchema={AddClubSchema}
            onSubmit={(values, actions) => (
              handelEdit(values),
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
                        <Label htmlFor="fullName" value="Member Name" />
                      </div>
                      <div>
                        <TextInput
                          id="fullName"
                          type="text"
                          placeholder="Member Name"
                          className="w-72"
                          value={values.fullName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
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
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-row flex-wrap items-center">
                      <div className="mb-2 w-32 ">
                        <Label htmlFor="rotarianId" value="rotarianId" />
                      </div>
                      <div>
                        <TextInput
                          id="rotarianId"
                          type="text"
                          placeholder="rotarianId"
                          required
                          className="w-72"
                          value={values.rotarianId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          color={
                            errors.rotarianId && touched.rotarianId ? "failure" : ""
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
                          <Label htmlFor="clubId" value="clubId" />
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
                            {allClubs.map((club)=> (
                                <option key={club._id} value={club._id}> {club.name} </option>
                            ))}
                           
                          </Select>
                        </div>
                      </div>
                    </div>
                  
                  </div>
    
                  <div className="flex flex-row justify-between mb-5">
                    <div className="flex flex-row">
                      <div className="flex flex-row flex-wrap items-center	">
                        <div className="mb-2 w-32 ">
                          <Label htmlFor="role" value="Role" />
                        </div>
                        <div>
                          <Select
                            id="role"
                            required
                            value={values.role}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-72"
                            color={errors.role && touched.role ? "failure" : ""}
                            helperText={
                              errors.role && touched.role ? (
                                <p className="text-xs ">{errors.role}</p>
                              ) : (
                                ""
                              )
                            }
                          >
                           <option value="admin">Admin</option>
                           <option value="member">Member</option>
                           <option value="clubAdmin">Club Admin</option>
                          </Select>
                        </div>
                      </div>
                    </div>
                  
                  </div>
                <Button type="submit" className="mt-10 w-72 self-center	">
                  Edit
                </Button>
              </form>
            )}
          </Formik>
        </div>: ''}
      
      </>
      );
}
 
export default EmployeeEdit;