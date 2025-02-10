import { Button, Label, TextInput, Select } from "flowbite-react";
import { Formik } from "formik";
import { AddClubSchema } from "../../schema";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../context/Mycontext";

export const AddCommityMember = () => {
  const {accessToken , allCommities , fetchCommityMembers, allusers} = useContext(MyContext)
  const navigate = useNavigate()

const AddCommityMember = async (commityMember) => {
  console.log('commityMember :>> ', commityMember);
 await axios
    .post("https://rotary.shakoush.xyz/commity-members", commityMember,  {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      console.log("Commity added successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error adding Commity:", error);
    });
};
 
  return (
    <>
      <h1 className="text-3xl font-bold">Add Committee Member</h1>
      <div className="flex flex-row px-5 py-10">
        <Formik
          initialValues={{
            userId: "",
            role: "",
            commityId: "",
            position: ''
          }}
        //   validationSchema={AddClubSchema}
          onSubmit={async(values, actions) => (
           await AddCommityMember(values),
            fetchCommityMembers(),
            actions.resetForm(),
            navigate('/districtCommitiesMembers')
          
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
                <div className="flex flex-row">
                  <div className="flex flex-row flex-wrap items-center	">
                    <div className="mb-2 w-32 ">
                      <Label htmlFor="commityId" value="Committee" />
                    </div>
                    <div>
                      <Select
                        id="commityId"
                        required
                        value={values.commityId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-72"
                        color={errors.commityId && touched.commityId ? "failure" : ""}
                        helperText={
                          errors.commityId && touched.commityId ? (
                            <p className="text-xs ">{errors.commityId}</p>
                          ) : (
                            ""
                          )
                        }
                      >
                       <option value="">select</option>
                       <option value="cairoOffice">Cairo Office</option>
                       <option value="alexOffice">Alex Office</option>
                       {allCommities.map((commity, index)=>(
                         
                         <option key={index} value={commity._id}>{commity.name}</option>
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
                      <Label htmlFor="userId" value="Member" />
                    </div>
                    <div>
                      <Select
                        id="userId"
                        required
                        value={values.userId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-72"
                        color={errors.userId && touched.userId ? "failure" : ""}
                        helperText={
                          errors.userId && touched.userId ? (
                            <p className="text-xs ">{errors.userId}</p>
                          ) : (
                            ""
                          )
                        }
                      >
                       {allusers.map((user)=> (
                        <option key={user._id} value={user._id}> {user.fullName} </option>
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
                      <Label htmlFor="position" value="Committee Role" />
                    </div>
                    <div>
                      <Select
                        id="position"
                        required
                        value={values.position}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-72"
                        color={errors.position && touched.position ? "failure" : ""}
                        helperText={
                          errors.position && touched.position ? (
                            <p className="text-xs ">{errors.position}</p>
                          ) : (
                            ""
                          )
                        }
                      >
                       <option value="">select</option>
                       <option value="president">Chair</option>
                       <option value="v-president">Vice Chair</option>
                       <option value="v-president">Administrator</option>
                       <option value="v-president">Member</option>
                      </Select>
                    </div>
                  </div>
                </div>
              
              </div>
              <div className="flex flex-row justify-between mb-5">
                <div className="flex flex-row">
                  <div className="flex flex-row flex-wrap items-center	">
                    <div className="mb-2 w-32 ">
                      <Label htmlFor="role" value="App Role" />
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
                       <option value="">select</option>
                       <option value="admin">Committee Admin</option>
                       <option value="member">Committee Member</option>
                      </Select>
                    </div>
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
