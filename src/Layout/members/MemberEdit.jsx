import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MyContext } from "../../context/Mycontext";
import { Formik } from "formik";
import { Button, Label, TextInput, Select } from "flowbite-react";

import CustomInput from "./input";

export const MemberEdit = () => {
  const { id } = useParams();
  const [member, setMember] = useState();
  const { accessToken, fetchAllUsers, allClubs } = useContext(MyContext);
  const navigate = useNavigate();
  const Clubs = allClubs;

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
    console.log("values :>> ", values);
    try {
      const res = await fetch(
        `https://rotary.shakoush.xyz/users/update-user/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(values),
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log("Member updated successfully", data);
        fetchAllUsers();
      } else {
        console.error("Error: in updating", res.status);
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

  console.log("member :>> ", member);
  return (
    <>
      <h1 className="text-3xl font-bold">Edit Member</h1>
      {member ? (
        <div className="flex flex-row px-5 py-10">
          <Formik
            initialValues={{
              fullName: member.fullName,
              rotarianId: member.rotarianId,
              role: member.role,
              clubId: member.club?.clubId,
              clubRole: member.clubRole,
              lastPosition: member.lastPosition,
              incomingPosition: member.incomingPosition,
              districtRole: member.districtRole,
              incomingDistrictRole: member.incomingDistrictRole,
              // password: "",
              // isEmployee: false,
            }}
            // validationSchema={AddClubSchema}
            onSubmit={async (values, actions) => (
              await handelEdit(values),
              fetchAllUsers(),
              actions.resetForm(),
              navigate("/membersLayout")
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
                  </div>

                  <div className="flex flex-row">
                    <div className="flex flex-row flex-wrap items-center">
                      <div className="mb-2 w-32 ">
                        <Label htmlFor="clubRole" value="Club Role" />
                      </div>
                      <div>
                        <Select
                          id="clubRole"
                          required
                          value={values.clubRole}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-72"
                          color={
                            errors.clubRole && touched.clubRole ? "failure" : ""
                          }
                          helperText={
                            errors.clubRole && touched.clubRole ? (
                              <p className="text-xs ">{errors.clubRole}</p>
                            ) : (
                              ""
                            )
                          }
                        >
                           <option value="">select role</option>
                        <option value="Club President">Club President</option>
                        <option value="Club Vice President">Club Vice President</option>
                        <option value="Club Secretary">
                          Club Secretary
                        </option>
                        <option value="Club Executive Secretary/Director">
                        Club Executive Secretary/Director
                        </option>
                        <option value="Club Foundation Chair">
                          Club Foundation Chair
                        </option>
                        <option value="Club Learning Facilitator">
                          {" "}
                          Club Learning Facilitator
                        </option>
                        <option value="Club Membership Chair">
                          {" "}
                          Club Membership Chair
                        </option>
                        <option value="Club Public Image Chair">
                          Club Public Image Chair
                        </option>
                        <option value="Club Service Projects Chair">
                          Club Service Projects Chair
                        </option>
                        <option value="Club Treasurer">Club Treasurer</option>
                        <option value="Club Young Leaders Contact">
                          Club Young Leaders Contact
                        </option>
                        <option value="Club Administration Chair">
                          Club Administration Chair
                        </option>
                        <option value="Club Sergeant-at-arms">
                          Club Sergeant-at-arms
                        </option>
                        <option value="null">
                          null
                        </option>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between mb-5">
                  <div className="flex flex-row">
                    <div className="flex flex-row flex-wrap items-center	">
                      <div className="mb-2 w-32 ">
                        <Label htmlFor="rotarianId" value="Rotrian ID" />
                      </div>
                      <div>
                        <TextInput
                          id="rotarianId"
                          type="number"
                          placeholder="Member ID"
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
                  <div className="flex flex-row">
                    <div className="flex flex-row flex-wrap items-center">
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
                          <option value="">Select User Role</option>
                          <option value="admin">Admin</option>
                          <option value="member">Member</option>
                          <option value="clubAdmin">Club Admin</option>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between mb-5">
                  <div className="flex flex-row">
                    <div className="flex flex-row flex-wrap items-center">
                      <div className="mb-2 w-32 ">
                        <Label
                          htmlFor="incomingPosition"
                          value="Incoming Role"
                        />
                      </div>
                      <div>
                        <Select
                          id="incomingPosition"
                          required
                          value={values.incomingPosition}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-72"
                          color={
                            errors.incomingPosition && touched.incomingPosition
                              ? "failure"
                              : ""
                          }
                          helperText={
                            errors.incomingPosition &&
                            touched.incomingPosition ? (
                              <p className="text-xs ">
                                {errors.incomingPosition}
                              </p>
                            ) : (
                              ""
                            )
                          }
                        >
                           <option value="">select role</option>
                        <option value="Club President">Club President</option>
                        <option value="Club Vice President">Club Vice President</option>
                        <option value="Club Secretary">
                          Club Secretary
                        </option>
                        <option value="Club Executive Secretary/Director">
                        Club Executive Secretary/Director
                        </option>
                        <option value="Club Foundation Chair">
                          Club Foundation Chair
                        </option>
                        <option value="Club Learning Facilitator">
                          {" "}
                          Club Learning Facilitator
                        </option>
                        <option value="Club Membership Chair">
                          {" "}
                          Club Membership Chair
                        </option>
                        <option value="Club Public Image Chair">
                          Club Public Image Chair
                        </option>
                        <option value="Club Service Projects Chair">
                          Club Service Projects Chair
                        </option>
                        <option value="Club Treasurer">Club Treasurer</option>
                        <option value="Club Young Leaders Contact">
                          Club Young Leaders Contact
                        </option>
                        <option value="Club Administration Chair">
                          Club Administration Chair
                        </option>
                        <option value="Club Sergeant-at-arms">
                          Club Sergeant-at-arms
                        </option>
                        <option value="null">
                          null
                        </option>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row">
                    <div className="flex flex-row flex-wrap items-center">
                      <div className="mb-2 w-32 ">
                        <Label htmlFor="lastPosition" value="Past Role" />
                      </div>
                      <div>
                        <Select
                          id="lastPosition"
                          required
                          value={values.lastPosition}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-72"
                          color={
                            errors.lastPosition && touched.lastPosition
                              ? "failure"
                              : ""
                          }
                          helperText={
                            errors.lastPosition && touched.lastPosition ? (
                              <p className="text-xs ">{errors.lastPosition}</p>
                            ) : (
                              ""
                            )
                          }
                        >
                          <option value="">select role</option>
                          <option value="pp">PP</option>
                          <option value="PDG">PDG</option>
                        <option value="null">null</option>

                        </Select>
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
                          color={
                            errors.clubId && touched.clubId ? "failure" : ""
                          }
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
                               {/* {club.clubId} */}
                            </option>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex flex-row">
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
                                        errors.password && touched.password ? "failure" : ""
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
                              </div> */}
                </div>
                <div className="flex flex-row justify-between mb-5">
                <div className="flex flex-row">
                  <div className="flex flex-row flex-wrap items-center">
                    <div className="mb-2 w-32 ">
                      <Label htmlFor="districtRole" value="District Role" />
                    </div>
                    <div>
                      <Select
                        id="districtRole"
                        required
                        value={values.districtRole}
                        onChange={handleChange}
                        // onChange={(e) => {

                        //   handelSelectdistrictRole(e.target.value)
                        // }}
                        onBlur={handleBlur}
                        className="w-72"
                        color={
                          errors.districtRole && touched.districtRole
                            ? "failure"
                            : ""
                        }
                        helperText={
                          errors.districtRole && touched.districtRole ? (
                            <p className="text-xs ">{errors.districtRole}</p>
                          ) : (
                            ""
                          )
                        }
                      >
                        <option value="">Select User districtRole</option>
                        <option value="Digital Transformation Committee Chair">
                          Digital Transformation Committee Chair
                        </option>{" "}
                        <option value="AGC">AGC</option>
                        <option value="DGN">DGN</option>
                        <option value="null">null</option>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="flex flex-row flex-wrap items-center">
                    <div className="mb-2 w-32 ">
                      <Label
                        htmlFor="incomingDistrictRole"
                        value="Incomming District Role"
                      />
                    </div>
                    <div>
                      <Select
                        id="incomingDistrictRole"
                        required
                        value={values.incomingDistrictRole}
                        onChange={handleChange}
                        // onChange={(e) => {

                        //   handelSelectincomingDistrictRole(e.target.value)
                        // }}
                        onBlur={handleBlur}
                        className="w-72"
                        color={
                          errors.incomingDistrictRole &&
                          touched.incomingDistrictRole
                            ? "failure"
                            : ""
                        }
                        helperText={
                          errors.incomingDistrictRole &&
                          touched.incomingDistrictRole ? (
                            <p className="text-xs ">
                              {errors.incomingDistrictRole}
                            </p>
                          ) : (
                            ""
                          )
                        }
                      >
                        <option value="">
                          Select User incomingDistrictRole
                        </option>
                        <option value="Digital Transformation Committee Chair">
                          Digital Transformation Committee Chair
                        </option>
                        <option value="AGC">AGC</option>
                        <option value="DGN">DGN</option>
                        <option value="null">null</option>
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
      ) : (
        ""
      )}
    </>
  );
};
