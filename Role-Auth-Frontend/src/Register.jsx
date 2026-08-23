import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import "./App.css";

const schema = yup.object().shape({
    name: yup
        .string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must not exceed 30 characters"),

    email: yup
        .string()
        .required("Email is required")
        .email("Please enter a valid email"),

    password: yup
        .string()
        .required("Password is required")
        .min(5, "Password must be at least 5 characters")
        .max(20, "Password must not exceed 20 characters"),

    cpassword: yup
        .string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("password")], "Passwords must match"),

    role: yup
        .string()
        .required("Role is required"),

});

function Register({ onLogin }) {


    const submit = async (data) => {
        try {

            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    role: data.role,

                }
            );

            console.log("Register Response:", response.data);

            Swal.fire({
                icon: "success",
                title: "Registration Successful!",
                text: "Your account has been created successfully.",
            });
        } catch (error) {

            console.log(
                error.response?.data || error.message
            );

            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: error.response?.data?.message || "Something went wrong",
            });

        }

    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <form onSubmit={handleSubmit(submit)}>

            <div id="login">

                <div id="lf">
                    Register
                </div>

                <div id="l">

                    {/* <div style={{ fontSize: "30px" }}>   Register   <br /> </div> */}

                    <div>
                        Create your account
                    </div>
                    {/* Name */}

                    <input {...register("name")} type="text" placeholder="User Name" className="loginf"
                    />

                    {errors.name && (<p className="text-danger">  {errors.name.message}  </p>)} <br />

                    {/* Email */}

                    <input  {...register("email")} type="email" placeholder="Email" className="loginf"
                    />

                    {errors.email && (<p className="text-danger">  {errors.email.message} </p>)}  <br />

                    {/* Password */}

                    <input {...register("password")} type="password" placeholder="Password" className="loginf" />

                    {errors.password && (<p className="text-danger"> {errors.password.message}   </p>)} <br />

                    {/* Confirm Password */}

                    <input   {...register("cpassword")} type="password" placeholder="Confirm Password" className="loginf" />

                    {errors.cpassword && (<p className="text-danger">   {errors.cpassword.message}  </p>)} <br />

                    <select {...register("role")} className="loginf" style={{color:"black"}}>
                        <option value="">Select Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                    {errors.role && (
                        <p className="text-danger">
                            {errors.role.message}
                        </p>
                    )}

                    <br />


                    <input type="submit" value="Register" className="loginbtn" /> <br />
                    Don't have an account?{" "}

                    <button type="button" onClick={onLogin}>
                        Login
                    </button>
                </div>
            </div>

        </form>
    );
}

export default Register;
