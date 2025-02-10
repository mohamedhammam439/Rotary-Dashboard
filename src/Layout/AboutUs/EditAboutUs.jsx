import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MyContext } from "../../context/Mycontext";
import { Formik } from "formik";
import { Button, Label, TextInput } from "flowbite-react";
import axios from "axios";

export const AboutUsEdit = () => {
  const [aboutUs, setAboutUs] = useState({});
  const { accessToken , refreshAccessToken} = useContext(MyContext);
  const [fieldValue, setFieldValue] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const response = await axios.get(
          "https://rotary.shakoush.xyz/about-us",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("About us", response.data);
        setAboutUs(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Access token expired, try refreshing it
          refreshAccessToken();
        } else {
          console.error(error);
        }
      }
    };
    fetchAboutUs();
  }, []);

  const EditForm = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("file", values.file);

      const res = await fetch(
        `https://rotary.shakoush.xyz/about-us`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log("Club edited successfully", data);
        // fetchAllClubs();
      } else {
        console.error("Error in edit", res.status);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Access token expired, try refreshing it
        refreshAccessToken();
      } else {
        console.error(error);
      }
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Edit About Us</h1>
      {aboutUs ? (
        <div className="flex flex-row px-5 py-10">
          <Formik
            initialValues={{
              title: aboutUs?.title,
              description: aboutUs?.description,
              file: aboutUs?.file,
            }}
            enableReinitialize={true}
            onSubmit={(values, actions) => (
              console.log("values :>> ", values),
              values.file = fieldValue,
              EditForm(values),
              navigate("/aboutUs")
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
                <div className="flex  flex-row justify-between mb-5">
                  <div className="flex flex-row ">
                    <div className="flex flex-row flex-wrap items-center">
                      <div className="mb-2 w-32 ">
                        <Label htmlFor="title" value="title" />
                      </div>
                      <div>
                        <TextInput
                          id="title"
                          type="text"
                          placeholder="title"
                          className="w-72"
                          value={values?.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
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
                  <div className="flex flex-row">
                    <div className="flex flex-row flex-wrap items-center">
                      <div className="mb-2 w-32 ">
                        <Label htmlFor="description" value="description" />
                      </div>
                      <div>
                        <TextInput
                          id="description"
                          type="text"
                          placeholder="description"
                          required
                          className="w-72"
                          value={values?.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          color={
                            errors.description && touched.description ? "failure" : ""
                          }
                          helperText={
                            errors.description && touched.description ? (
                              <p className="text-xs ">{errors.description}</p>
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
                        <Label htmlFor="file" value="file" />
                      </div>
                      <div>
                        <img src={aboutUs?.logo} className="mr-10 h-40 rounded-3xl" alt="Rotary" />
                        <input
                          type="file"
                          id="file"
                          className="w-72"
                          onChange={(event) => {
                            setFieldValue(event.currentTarget.files[0]);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Button type="submit" className="mt-10 w-72 self-center">
                  Edit
                </Button>
              </form>
            )}
          </Formik>
        </div>
      ) : ''}
    </>
  );
};
