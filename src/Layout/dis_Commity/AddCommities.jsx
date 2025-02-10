import { Button, Label, TextInput, Select, Textarea } from "flowbite-react";
import { Formik } from "formik";
import { AddClubSchema } from "../../schema";
import axios from "axios";
import { useContext } from "react";
import { MyContext } from "../../context/Mycontext";
import { useNavigate } from "react-router-dom";

export const AddCommities = () => {
  const {accessToken , fetchCommity} = useContext(MyContext)
  const navigate = useNavigate()

  const AddCommity = async (commity) => {
   await axios
      .post("https://rotary.shakoush.xyz/commities",commity,  {
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
      <h1 className="text-3xl font-bold">Add Committee</h1>
      <div className="flex flex-row px-5 py-10">
        <Formik
          initialValues={{
            name: "",
          }}
        //   validationSchema={AddClubSchema}
          onSubmit={async(values, actions) => (
            await AddCommity(values),
            fetchCommity(),
            actions.resetForm(),
            navigate('/districtCommities')
          
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
                      <Label htmlFor="name" value="Committee Name" />
                    </div>
                    <div>
                      <TextInput
                        id="name"
                        type="text"
                        placeholder="Committee Name"
                        className="w-72"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        color={
                          errors.name && touched.name ? "failure" : ""
                        }
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
                <div className="flex flex-row ">
                  <div className="flex flex-row flex-wrap items-center">
                    <div className="mb-2 w-32 ">
                      <Label htmlFor="banckAccount" value="Bank Account" />
                    </div>
                    <div>
                      <Textarea
                        id="banckAccount"
                        type="text"
                        placeholder="Bank Account"
                        aria-multiline
                        className="w-72"
                        value={values.banckAccount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        color={
                          errors.banckAccount && touched.banckAccount ? "failure" : ""
                        }
                        helperText={
                          errors.banckAccount && touched.banckAccount ? (
                            <p className="text-xs ">{errors.banckAccount}</p>
                          ) : (
                            ""
                          )
                        }
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
