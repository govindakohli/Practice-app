import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

function UpdateUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Formik logic
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password should be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.put(`http://localhost:8000/api/update/${id}`, values);
        toast.success(response.data.msg, { position: "top-center" });
        navigate("/");
      } catch (err) {
        console.error(err);
        toast.error("An error occurred.");
      }
    },
  });

  useEffect(() => {
    // Fetch user data and set form values
    axios
      .get(`http://localhost:8000/api/getOne/${id}`)
      .then((response) => {
        const userData = response.data;
        formik.setValues({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          password: userData.password || "",
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Link to="/">Back</Link>
      <br />
      <br />
      <input
        type="text"
        name="firstName"
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
      <button type="submit">Update User</button>
    </form>
  );
}

export default UpdateUser;
