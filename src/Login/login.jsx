import { Button, Label, TextInput, Select } from "flowbite-react";
import { Formik } from "formik";
import Logo from "../assets/rotary.png";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/Mycontext";
import { AdminSchema } from "../schema";
import Loading from "./loading";
import Cookies from 'js-cookie';

const Login = () => {
  const { setIsLogedIn, getAccessToken} = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      setIsLogedIn(true);
    }
  }, [setIsLogedIn]);
  return (
    <>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="w-2/4 h-3/4 m-auto  rounded-md p-10 flex flex-col gap-y-1">
            <img src={Logo} className="w-4/6 self-center mb-10" alt="Rotary" />
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              // validationSchema={AdminSchema}
              onSubmit={async (values, actions) => {
                setLoading(true);
                await getAccessToken(values);
                setLoading(false);
                actions.resetForm();
              }}
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
                  className="flex flex-col gap-4 w-full self-center justify-center items-center"
                  onSubmit={handleSubmit}
                >
                  <TextInput
                    id="email"
                    type="text"
                    placeholder="email"
                    className="w-9/12"
                    value={values.email}
                    onChange={handleChange}
                    // onChange={(e) => {
                    //   setEmail(e.target.value ? e.target.value : "");
                    //   handleChange(e);
                    // }}
                    onBlur={handleBlur}
                    required
                    color={errors.email && touched.email ? "failure" : ""}
                    helperText={
                      errors.email && touched.email ? (
                        <p className="text-xs ">{errors.email}</p>
                      ) : (
                        ""
                      )
                    }
                  />
                  <TextInput
                    id="password"
                    type="password"
                    placeholder="password"
                    required
                    className="w-9/12"
                    value={values.password}
                    onChange={handleChange}
                    // onChange={(e) => {
                    //   setPassword(e.target.value ? e.target.value : "");
                    //   handleChange(e);
                    // }}
                    onBlur={handleBlur}
                    color={errors.password && touched.password ? "failure" : ""}
                    helperText={
                      errors.password && touched.password ? (
                        <p className="text-xs ">{errors.password}</p>
                      ) : (
                        ""
                      )
                    }
                  />

                  <Button type="submit" className="mt-2 w-9/12 self-center">
                    Login
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
