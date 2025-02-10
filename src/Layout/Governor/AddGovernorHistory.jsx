import { Button, Label, TextInput, Select, FileInput } from "flowbite-react";

import { Formik } from "formik";
import { useState, useEffect, useContext } from "react";
import { MyContext } from "../../context/Mycontext";
import { useNavigate } from "react-router-dom";
const AddGovernorHistory = () => {
    const [fieldValue, setFieldValue] = useState();
    const {accessToken , fetchGovernorHistory}=useContext(MyContext)

  const navigate = useNavigate();

     
    const AddGovernor = async (values) => {
        try {
          const formData = new FormData();
          formData.append("fullName", values.fullName);
          formData.append("title", values.title);
          formData.append("year", values.year);
          formData.append("file", values.file); // Append the file here
    
          const res = await fetch(`https://rotary.shakoush.xyz/governor-history`, {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log("formdata :>> ", formData);
          if (res.ok) {
            const data = await res.json();
            console.log("Governor Added successfully", data);
            // Redirect or perform any other action after successful update
          } else {
            console.error("Error in Adding", res.status);
            // Handle the error scenario
          }
        } catch (error) {
          console.error("Error:", error);
          // Handle the error scenario
        }
      };
    
    return (  <>
          <h1 className="text-3xl font-bold">Add Governor</h1>
          <div className="flex flex-row px-5 py-10">
            <Formik
              initialValues={{
                fullName: "",
                title: "",
                year: "",
                file: null,
              }}
              // validationSchema={AddClubSchema}
              onSubmit={async (values, actions) => (
                console.log("values :>> ", values),
                (values.file = fieldValue), // Ensure file is set properly
                await AddGovernor(values),
                await fetchGovernorHistory(),
                actions.resetForm(),
                navigate("/governorHistory")
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
                          <Label htmlFor="fullName" value="FullName" />
                        </div>
                        <div>
                          <TextInput
                            id="fullName"
                            type="text"
                            placeholder="fullName"
                            className="w-72"
                            value={values.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            color={errors.fullName && touched.fullName ? "failure" : ""}
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
                          <Label htmlFor="title" value="Title" />
                        </div>
                        <div>
                          <TextInput
                            id="title"
                            type="text"
                            placeholder="title"
                            required
                            className="w-72"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            color={errors.title && touched.title ? "failure" : ""}
                            helperText={
                              errors.title && touched.title ? (
                                <p className="text-xs ">{errors.title}</p>
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
                    <div className="flex flex-row ">
                      <div className="flex flex-row flex-wrap items-center">
                        <div className="mb-2 w-32 ">
                          <Label htmlFor="year" value="year" />
                        </div>
                        <div>
                          <TextInput
                            id="year"
                            type="text"
                            placeholder="year Link"
                            className="w-72"
                            value={values.year}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            color={
                              errors.year && touched.year ? "failure" : ""
                            }
                            helperText={
                              errors.year && touched.year ? (
                                <p className="text-xs ">{errors.year}</p>
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
                    <div className="flex flex-row ">
                      <div className="flex flex-row flex-wrap items-center">
                        <div className="mb-2 w-32 ">
                          <Label htmlFor="file" value="Logo" />
                        </div>
                        <div>
                          <input
                            type="file"
                            id="file"
                            className="w-72"
                            onChange={(event) => {
                              setFieldValue(event.currentTarget.files[0]);
                            }}
                            // onBlur={handleBlur}
                            // helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)."
                          />
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
        </> );
}
 
export default AddGovernorHistory;