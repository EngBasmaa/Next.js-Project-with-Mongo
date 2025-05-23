import React from "react";

export default function Login() {
  return (
    <div
      className="container page pt-5 pb-5 ps-5 pe-5 bg-light mt-5 mb-5 p-1"
      style={{ maxWidth: "400px" }}
    >
      <h2 className="mb-4 text-center" style={{ color: "var(--primary)" }}>
        Login
      </h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <button
          className="btn w-100 mt-3"
          style={{ backgroundColor: "var(--primary)", color: "#fff" }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
