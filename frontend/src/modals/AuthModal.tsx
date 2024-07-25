import classNames from "classnames";
import { Form, Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { Logo } from "../components/Layout/components/Header";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../components/Modal";
import { useLoginMutation, useRegisterMutation } from "../redux/services/auth";

enum AuthType {
  LOGIN,
  SIGNUP,
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const signUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

const AuthModal = ({ onRequestClose }: { onRequestClose: () => void }) => {
  const [authType, setAuthType] = useState(AuthType.LOGIN);
  const handleAuthTypeChange = (authType: AuthType) => {
    setAuthType(authType);
  };
  return (
    <Modal
      className="p-8"
      width={550}
      onRequestClose={onRequestClose}
      isOpen={true}
    >
      {authType === AuthType.LOGIN && (
        <LoginForm
          handleAuthTypeChange={handleAuthTypeChange}
          onRequestClose={onRequestClose}
        />
      )}
      {authType === AuthType.SIGNUP && (
        <SignUpForm handleAuthTypeChange={handleAuthTypeChange} />
      )}
    </Modal>
  );
};

const LoginForm = ({
  handleAuthTypeChange,
  onRequestClose,
}: {
  handleAuthTypeChange: (authType: AuthType) => void;
  onRequestClose: () => void;
}) => {
  const [loginError, setLoginError] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const handleLogin = useCallback(
    async (email: string, password: string) => {
      setLoginError("");
      await login({
        username: email,
        password: password,
      })
        .unwrap()
        .then((response) => {
          if (!response?.access_token) {
            setLoginError("Something went wrong!");
          } else {
            onRequestClose();
          }
        })
        .catch((error) => {
          if ([400, 401].includes(error?.status) && error?.data?.detail) {
            setLoginError(error.data.detail);
          } else {
            setLoginError("Something went wrong!");
          }
        });
    },
    [login]
  );
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={({ email, password }) => {
          handleLogin(decodeURIComponent(email), password);
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount={false}
        validationSchema={loginSchema}
      >
        {(props) => {
          const { values, errors, setFieldValue } = props;
          return (
            <div className="mt-2 mx-auto w-full max-w-sm">
              <div className="flex justify-center w-full mb-4">
                <Logo />
              </div>
              <Form className="flex flex-col w-full gap-2">
                {loginError && (
                  <div className="my-2 text-red-600">{loginError}</div>
                )}
                <input
                  placeholder="Enter email"
                  value={values?.email}
                  onChange={(e) => setFieldValue("email", e.target.value)}
                  className={classNames("border border-gray-200 rounded", {
                    "border-red-500": errors.email,
                  })}
                />
                {errors.email && (
                  <div className="text-red-600 text-sm">{errors.email}</div>
                )}
                <input
                  type="password"
                  placeholder="Enter password"
                  value={values?.password}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  className={classNames("border border-gray-200 rounded", {
                    "border-red-500": errors.password,
                  })}
                />
                {errors.password && (
                  <div className="text-red-600 text-sm">{errors.password}</div>
                )}
                <button
                  type="submit"
                  onClick={() => {}}
                  className="bg-green-700 hover:bg-green-800 text-white w-full p-2 mt-6 border-0 rounded"
                >
                  {isLoading ? <LoadingSpinner /> : "Login"}
                </button>
              </Form>
            </div>
          );
        }}
      </Formik>
      <div className="w-full flex justify-center mt-4">
        <button
          type="button"
          className="text-sm text-primary"
          onClick={() => handleAuthTypeChange(AuthType.SIGNUP)}
        >
          Or Sign up
        </button>
      </div>
    </div>
  );
};

const SignUpForm = ({
  handleAuthTypeChange,
}: {
  handleAuthTypeChange: (authType: AuthType) => void;
}) => {
  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();
  const handleSignUp = useCallback(
    async (email: string, password: string) => {
      setSignUpError("");
      await register({
        email,
        password,
      })
        .unwrap()
        .then((res: any) => {
          if (res?.is_active) {
            setSignUpSuccess(true);
          } else {
            setSignUpError("Something went wrong. Please contact support.");
          }
        })
        .catch((error: any) => {
          if (error?.status === 400 && error?.data?.detail) {
            setSignUpError(error.data.detail);
          } else {
            setSignUpError("Something went wrong. Please contact support.");
          }
        });
    },
    [register]
  );

  if (signUpSuccess) {
    return <SignUpSuccess handleAuthTypeChange={handleAuthTypeChange} />;
  }

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={({ email, password }) => {
          handleSignUp(decodeURIComponent(email), password);
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount={false}
        validationSchema={signUpSchema}
      >
        {(props) => {
          const { values, errors, setFieldValue } = props;
          return (
            <div className="mt-2 mx-auto w-full max-w-sm">
              <div className="flex justify-center w-full mb-4">
                <Logo />
              </div>
              <Form className="flex flex-col w-full gap-2">
                {signUpError && (
                  <div className="my-2 text-red-600">{signUpError}</div>
                )}
                <input
                  placeholder="Enter email"
                  value={values?.email}
                  onChange={(e) => setFieldValue("email", e.target.value)}
                  className={classNames("border border-gray-200 rounded", {
                    "border-red-500": errors.email,
                  })}
                />
                {errors.email && (
                  <div className="text-red-600 text-sm">{errors.email}</div>
                )}
                <input
                  type="password"
                  placeholder="Enter password"
                  value={values?.password}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  className={classNames("border border-gray-200 rounded", {
                    "border-red-500": errors.password,
                  })}
                />
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={values?.confirmPassword}
                  onChange={(e) =>
                    setFieldValue("confirmPassword", e.target.value)
                  }
                  className={classNames("border border-gray-200 rounded", {
                    "border-red-500": errors.password,
                  })}
                />
                {errors.confirmPassword && (
                  <div className="text-red-600 text-sm">
                    {errors.confirmPassword}
                  </div>
                )}

                <button
                  type="submit"
                  onClick={() => {}}
                  className="bg-green-700 hover:bg-green-800 text-white w-full p-2 mt-6 border-0 rounded"
                >
                  {isLoading ? <LoadingSpinner /> : "Sign Up"}
                </button>
              </Form>
            </div>
          );
        }}
      </Formik>
      <div className="w-full flex justify-center mt-4">
        <button
          type="button"
          className="text-sm text-primary"
          onClick={() => handleAuthTypeChange(AuthType.LOGIN)}
        >
          Or Login In
        </button>
      </div>
    </div>
  );
};

const SignUpSuccess = ({ handleAuthTypeChange }: any) => {
  useEffect(() => {
    setTimeout(() => handleAuthTypeChange(AuthType.LOGIN), 2000);
  }, []);
  return (
    <div className="mt-2 mx-auto w-full max-w-sm">
      <div className="flex justify-center w-full mb-4">
        <Logo />
      </div>
      <div className="text-green-800 text-center w-full">
        Successfully Signed Up! Please Login to proceed.
      </div>
    </div>
  );
};
export default AuthModal;
