import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import "./App.css";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email")
    .min(3, "Email must be at least 3 characters")
    .max(30, "Email must not exceed 30 characters"),

  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters")
    .max(20, "Password must not exceed 20 characters"),
});

function Login({ onSignup }) {
  // Page change karne ke liye
  const navigate = useNavigate();

  const submit = async (data) => {
    try {
      // Backend login API
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: data.email,
          password: data.password,
        }
      );

      console.log("Backend Response:", response.data);

      // JWT token save
      localStorage.setItem("token", response.data.token);

      // User data save
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // Login success popup
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back " + response.data.user.name,
        confirmButtonText: "Continue",
      }).then(() => {
        // Role ke according dashboard
        if (response.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      });

    } catch (error) {
      console.log(error.response?.data || error.message);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong",
      });
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Input values watch kar rahe hain
  const email = watch("email");
  const password = watch("password");

  // Dono fields filled hain ya nahi
  const isFilled = email && password;

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div id="login">
        <div id="lf">Login</div>

        <div id="l">
          <div>
            Welcome back please login to your account
          </div>

          {/* Email */}
          <input
            {...register("email")}
            type="email"
            placeholder="email"
            className={
              isFilled ? "loginf filled" : "loginf"
            }
          />

          {errors.email && (
            <p className="text-danger">
              {errors.email.message}
            </p>
          )}

          <br />

          {/* Password */}
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className={
              isFilled ? "loginf filled" : "loginf"
            }
          />

          {errors.password && (
            <p className="text-danger">
              {errors.password.message}
            </p>
          )}

          {/* Remember Me */}
          <div>
            <input
              {...register("rememberMe")}
              type="checkbox"
              style={{ marginTop: "20px" }}
            />
            {" "}Remember me
          </div>

          {/* Login Button */}
          <input
            type="submit"
            value="Login"
            className={
              isFilled ? "loginbtn filled" : "loginbtn"
            }
          />

          <br />

          {/* Signup */}
          Don't have an account?{" "}

          <button
            type="button"
            onClick={onSignup}
          >
            Signup
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;


























// import React from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import Swal from "sweetalert2";

// import "./App.css";

// const schema = yup.object().shape({
//   email: yup
//     .string()
//     .required("Email is required")
//     .email("Please enter a valid email")
//     .min(3, "Username must be at least 3 characters")
//     .max(30, "Username must not exceed 20 characters"),

//   password: yup
//     .string()
//     .required("Password is required")
//     .min(5, "Password must be at least 5 characters")
//     .max(20, "Password must not exceed 20 characters"),
// });

// function Login({ onSignup }) {

//   const submit = async (data) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:5000/api/auth/login",
//       {
//         email: data.email,
//         password: data.password,
//       }
//     );

//     console.log("Backend Response:", response.data);

//     // JWT token save
//     localStorage.setItem("token", response.data.token);

//     // User data save
//     localStorage.setItem(
//       "user",
//       JSON.stringify(response.data.user)
//     );

   
//     Swal.fire({
//       icon: "success",
//       title: "Login Successful!",
//       text: "Welcome back " + response.data.user.name,
//       confirmButtonText: "Continue",
//     });

//   } catch (error) {
//     console.log(error.response?.data || error.message);

//     Swal.fire({
//       icon: "error",
//       title: "Login Failed",
//       text: error.response?.data?.message || "Something went wrong",
//     });
//   }
// };


//   const {
//     register, handleSubmit,  watch, formState: { errors }, } = useForm({  resolver: yupResolver(schema), });
     
    
//   const email = watch("email");
//   const password = watch("password");
//   const isFilled = email && password;

//   return (
//     <form onSubmit={handleSubmit(submit)}>
//       <div id="login">
//         <div id="lf">Login</div>

//         <div id="l">
//           {/* <div style={{ fontSize: "30px" }}>
//             Login
//             <br />
//           </div> */}

//           <div>Welcome back please login to your account</div>

//           <input {...register("email")} type="email" placeholder="email"   className={isFilled ? "loginf filled" : "loginf"}
//           /> 
//           {errors.email && ( <p className="text-danger">{errors.email.message}</p>)}<br />

//           <input {...register("password")} type="password" placeholder="Password"   className={isFilled ? "loginf filled" : "loginf"}
//           />

//           {errors.password && (<p className="text-danger">{errors.password.message}</p> )}

//           <div>
//             <input {...register("rememberMe")} type="checkbox" style={{ marginTop: "20px" }}
//             />
//             {" "}Remember me
//           </div>

//           <input type="submit" value="Login"  className={isFilled ? "loginbtn filled" : "loginbtn"} /><br />
//            Don't have an account?{" "}

// <button type="button" onClick={onSignup}>
//   Signup
// </button>

//         </div>
//       </div>
//     </form>
//   );
// }

// export default Login;
