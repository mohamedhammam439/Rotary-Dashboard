import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MyContext } from "../../context/Mycontext";
import { Formik } from "formik";
import { Button, Label, Select, TextInput, FileInput } from "flowbite-react";

export const ClubEdit = () => {
  const { clubId } = useParams();
  const [club, setClub] = useState();
  const { accessToken, fetchAllClubs , refreshAccessToken} = useContext(MyContext);
  const navigate = useNavigate();

  const [fieldValue, setFieldValue] = useState();

  
  useEffect(() => {
    const fetchClub = async () => {
      try {
        const res = await fetch(`https://rotary.shakoush.xyz/clubs/${clubId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setClub(data);
        } else {
          console.error("Error:", res.status);
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

    fetchClub();
  }, [clubId, accessToken]);


  const EditClubForm = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("clubId", values.clubId);
      formData.append("location", values.location);
      formData.append("about", values.about);
      formData.append("district", values.district);
      formData.append("city", values.city);
      formData.append("dashboard", values.dashboard);
      formData.append("meetingDate", values.meetingDate);
      formData.append("drive", values.drive);
      formData.append("file", values.file);
      
      const res = await fetch(
        `https://rotary.shakoush.xyz/clubs/${clubId}`,
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
        fetchAllClubs();
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
      <h1 className="text-3xl font-bold">Edit Club</h1>
      {club ? (
        <div className="flex flex-row px-5 py-10">
          <Formik
            initialValues={{
              name: club.name,
              clubId: club.clubId,
              location: club.location,
              about: club.about,
              dashboard: club.dashboard,
              drive: club.drive,
              city: club.city,
              meetingDate: club.meetingTime,
              district: "Egypt",
              file: club.logo
            }}
            // validationSchema={AddClubSchema}
            onSubmit={(values, actions) => (
              console.log("values :>> ", values),
              values.file = fieldValue,
              EditClubForm(values),
              // handelEdit(values),
              navigate("/clubLayout")
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
                        <Label htmlFor="name" value="Club Name" />
                      </div>
                      <div>
                        <TextInput
                          id="name"
                          type="text"
                          placeholder="Club Name"
                          className="w-72"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          color={errors.name && touched.name ? "failure" : ""}
                          helperText={
                            errors.name && touched.name ? (
                              <p className="text-xs ">{errors.name}</p>
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
                        <Label htmlFor="location" value="Address" />
                      </div>
                      <div>
                        <TextInput
                          id="location"
                          type="text"
                          placeholder="Location"
                          required
                          className="w-72"
                          value={values.location}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          color={
                            errors.location && touched.location ? "failure" : ""
                          }
                          helperText={
                            errors.location && touched.location ? (
                              <p className="text-xs ">{errors.location}</p>
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
                      <Label htmlFor="city" value="City" />
                    </div>
                    <div>
                      <Select
                        id="city"
                        required
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-72"
                        color={errors.city && touched.city ? "failure" : ""}
                        helperText={
                          errors.city && touched.city ? (
                            <p className="text-xs ">{errors.city}</p>
                          ) : (
                            ""
                          )
                        }
                      >
                        {Cities?.map((city) => (
                          <option key={city.value} value={city.value}>{city.label}</option>

                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
                  <div className="flex flex-row">
                    <div className="flex flex-row flex-wrap items-center">
                      <div className="mb-2 w-32 ">
                        <Label htmlFor="about" value="About" />
                      </div>
                      <div>
                        <TextInput
                          id="about"
                          type="text"
                          placeholder="about"
                          required
                          multiple
                          className="w-72"
                          value={values.about}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          color={errors.about && touched.about ? "failure" : ""}
                          helperText={
                            errors.about && touched.about ? (
                              <p className="text-xs ">{errors.about}</p>
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
                        <Label htmlFor="dashboard" value="Dashboard" />
                      </div>
                      <div>
                        <TextInput
                          id="dashboard"
                          type="text"
                          placeholder="dashboard Link"
                          className="w-72"
                          value={values.dashboard}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          color={
                            errors.dashboard && touched.dashboard
                              ? "failure"
                              : ""
                          }
                          helperText={
                            errors.dashboard && touched.dashboard ? (
                              <p className="text-xs ">{errors.dashboard}</p>
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
                        <Label htmlFor="drive" value="Drive" />
                      </div>
                      <div>
                        <TextInput
                          id="drive"
                          type="text"
                          placeholder="Drive Link"
                          required
                          className="w-72"
                          value={values.drive}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          color={errors.drive && touched.drive ? "failure" : ""}
                          helperText={
                            errors.drive && touched.drive ? (
                              <p className="text-xs ">{errors.drive}</p>
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
                        <Label htmlFor="meetingDate" value="Meeting Time" />
                      </div>
                      <div>
                        <TextInput
                          id="meetingDate"
                          type="text"
                          placeholder="meetingDate"
                          className="w-72"
                          value={values.meetingDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          color={
                            errors.meetingDate && touched.meetingDate
                              ? "failure"
                              : ""
                          }
                          helperText={
                            errors.meetingDate && touched.meetingDate ? (
                              <p className="text-xs ">{errors.meetingDate}</p>
                            ) : (
                              ""
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row ">
                    <div className="flex flex-row flex-wrap items-center">
                      <div className="mb-2 w-32 ">
                        <Label htmlFor="clubId" value="Club ID" />
                      </div>
                      <div>
                        <TextInput
                          id="clubId"
                          type="text"
                          placeholder="clubId"
                          className="w-72"
                          value={values.clubId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          color={
                            errors.clubId && touched.clubId
                              ? "failure"
                              : ""
                          }
                          helperText={
                            errors.clubId && touched.clubId ? (
                              <p className="text-xs ">{errors.clubId}</p>
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
                         <img src={club?.logo} className="mr-10 h-40 rounded-3xl" alt="Rotary" />
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
                <Button type="submit" className="mt-10 w-72 self-center	">
                  Edit
                </Button>
              </form>
            )}
          </Formik>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export const Cities = [
  { label: "Cairo", value: "Cairo" },
  { label: "Alexandria", value: "Alexandria" },
  { label: "Giza", value: "Giza" },
  { label: "6 October", value: "6 October" },
  { label: "Al Sharqia", value: "Al Sharqia" },
  { label: "Aswan", value: "Aswan" },
  { label: "Asyut", value: "Asyut" },
  { label: "Beheira", value: "Beheira" },
  { label: "Beni Suef", value: "Beni Suef" },
  { label: "Dakahlia", value: "Dakahlia" },
  { label: "Damietta", value: "Damietta" },
  { label: "Faiyum", value: "Faiyum" },
  { label: "Gharbia", value: "Gharbia" },
  { label: "Ismailia", value: "Ismailia" },
  { label: "Kafr el-Sheikh", value: "Kafr el-Sheikh" },
  { label: "Luxor", value: "Luxor" },
  { label: "Matrouh", value: "Matrouh" },
  { label: "Minya", value: "Minya" },
  { label: "Monufia", value: "Monufia" },
  { label: "New Valley", value: "New Valley" },
  { label: "North Sinai", value: "North Sinai" },
  { label: "Port Said", value: "Port Said" },
  { label: "Qalyubia", value: "Qalyubia" },
  { label: "Qena", value: "Qena" },
  { label: "Red Sea", value: "Red Sea" },
  { label: "Sohag", value: "Sohag" },
  { label: "South Sinai", value: "South Sinai" },
  { label: "Suez", value: "Suez" },
];