import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup"; // Optional for validation

function NewUser() {
  const navigate = useNavigate();

  // Formik logic
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password should be at least 6 characters").required("Password is required")
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:8000/api/create", values);
        toast.success(response.data.msg, { position: "top-center" });
        navigate("/");
        location.reload();
      } catch (err) {
        console.error(err);
        toast.error("An error occurred.");
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Link to="/">Back</Link>
      <br />
      <br />
      <input
        type="text"
        name="firstName"
        id="1"
        placeholder="First Name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <div style={{ color: "red" }}>{formik.errors.firstName}</div>
      ) : null}
      <br />
      <br />
      <input
        type="text"
        name="lastName"
        id="2"
        placeholder="Last Name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div style={{ color: "red" }}>{formik.errors.lastName}</div>
      ) : null}
      <br />
      <br />
      <input
        type="email"
        name="email"
        id="3"
        placeholder="Email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div style={{ color: "red" }}>{formik.errors.email}</div>
      ) : null}
      <br />
      <br />
      <input
        type="password"
        name="password"
        id="4"
        placeholder="Password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div style={{ color: "red" }}>{formik.errors.password}</div>
      ) : null}
      <br />
      <br />
      <button type="submit">New User</button>
    </form>
  );
}

export default NewUser;
