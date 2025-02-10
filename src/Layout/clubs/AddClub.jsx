import { Button, Label, TextInput, Select, FileInput } from "flowbite-react";

import { Formik } from "formik";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { MyContext } from "../../context/Mycontext";
import { useNavigate } from "react-router-dom";

export const AddClub = () => {
  const { accessToken, fetchAllClubs } = useContext(MyContext);
  const navigate = useNavigate();
  const [fieldValue, setFieldValue] = useState();
  const [AGMembers, setAGMembers] = useState([]);
  const [AGCMembers, setAGCMembers] = useState([]);

  console.log("fieldValue :>> ", fieldValue);

  const AddClubk = async (club) => {
    await axios
      .post("https://rotary.shakoush.xyz/clubs/add", club, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Item added successfully:", response.data.newClub);
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const AddClubForm = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("clubId", values.clubId);
      formData.append("location", values.location);
      formData.append("about", values.about);
      formData.append("city", values.city);
      formData.append("dashboard", values.dashboard);
      formData.append("drive", values.drive);
      formData.append("meetingTime", values.meetingTime);
      formData.append("district", values.district);
      formData.append("file", values.file); // Append the file here

      const res = await fetch(`https://rotary.shakoush.xyz/clubs/add`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("formdata :>> ", formData);
      if (res.ok) {
        const data = await res.json();
        console.log("Club Added successfully", data);
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

  useEffect(() => {
    const fetchAGMembers = async () => {
      await axios
        .get("https://rotary.shakoush.xyz/users/all-user-by-districtRole", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            districtRole: "AG",
          },
        })
        .then((response) => {
          setAGMembers(response.data);
          console.log("AG fetched successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error adding Member:", error);
        });
    };
    const fetchAGCMembers = async () => {
      await axios
        .get("https://rotary.shakoush.xyz/users/all-user-by-districtRole", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            districtRole: "AGC",
          },
        })
        .then((response) => {
          setAGCMembers(response.data);
          console.log("AGC fetched successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error adding Member:", error);
        });
    };
    fetchAGMembers();
    fetchAGCMembers();
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold">Add Club</h1>
      <div className="flex flex-row px-5 py-10">
        <Formik
          initialValues={{
            name: "",
            clubId: "",
            location: "",
            about: "",
            dashboard: "",
            drive: "",
            meetingTime: "",
            AG: "",
            AGC: "",
            city: "",
            file: null,
            district: "Egypt",
          }}
          // validationSchema={AddClubSchema}
          onSubmit={async (values, actions) => (
            console.log("values :>> ", values),
            (values.file = fieldValue), // Ensure file is set properly
            await AddClubForm(values),
            // AddClubk(values),
            await fetchAllClubs(),
            actions.resetForm(),
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
              <div className="flex flex-row justify-between mb-5">
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
                      <Label htmlFor="clubId" value="Club ID" />
                    </div>
                    <div>
                      <TextInput
                        id="clubId"
                        type="text"
                        placeholder="clubId"
                        required
                        className="w-72"
                        value={values.clubId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        color={errors.clubId && touched.clubId ? "failure" : ""}
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
                          errors.dashboard && touched.dashboard ? "failure" : ""
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
                      <Label htmlFor="meetingTime" value="Meeting Time" />
                    </div>
                    <div>
                      <TextInput
                        id="meetingTime"
                        type="text"
                        placeholder="Meeting date"
                        className="w-72"
                        value={values.meetingTime}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        color={
                          errors.meetingTime && touched.meetingTime
                            ? "failure"
                            : ""
                        }
                        helperText={
                          errors.meetingTime && touched.meetingTime ? (
                            <p className="text-xs ">{errors.meetingTime}</p>
                          ) : (
                            ""
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
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
                          <option key={city.value} value={city.value}>
                            {city.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between mb-5">
                <div className="flex flex-row ">
                  <div className="flex flex-row flex-wrap items-center">
                    <div className="mb-2 w-32 ">
                      <Label htmlFor="AG" value="AG" />
                    </div>
                    <div>
                      <Select
                        id="AG"
                        required
                        value={values.AG}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-72"
                        color={errors.AG && touched.AG ? "failure" : ""}
                        helperText={
                          errors.AG && touched.AG ? (
                            <p className="text-xs ">{errors.AG}</p>
                          ) : (
                            ""
                          )
                        }
                      >
                        <option>Select AG</option>

                        {AGMembers?.map((user) => (
                          <option key={user.value} value={user.rotarianId}>
                            {user.fullName}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row">
                  <div className="flex flex-row flex-wrap items-center">
                    <div className="mb-2 w-32 ">
                      <Label htmlFor="AGC" value="AGC" />
                    </div>
                    <div>
                      <Select
                        id="AGC"
                        required
                        value={values.AGC}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-72"
                        color={errors.AGC && touched.AGC ? "failure" : ""}
                        helperText={
                          errors.AGC && touched.AGC ? (
                            <p className="text-xs ">{errors.AGC}</p>
                          ) : (
                            ""
                          )
                        }
                      >
                        <option>Select AGC</option>

                        {AGCMembers?.map((user) => (
                          <option key={user.value} value={user.rotarianId}>
                            {user.fullName}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between mb-5">
                <div className="flex flex-row ">
                  <div className="flex flex-row flex-wrap items-center">
                    <div className="mb-2 w-32 ">
                      <Label htmlFor="about" value="About" />
                    </div>
                    <div>
                      <TextInput
                        id="about"
                        type="text"
                        placeholder="Meeting date"
                        className="w-72"
                        value={values.about}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
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

                <div className="flex flex-row">
                  <div className="flex flex-row flex-wrap items-center">
                    <div className="mb-2 w-32 ">
                      <Label htmlFor="location" value="Meeting Location" />
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
