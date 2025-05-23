"use client";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { BiSolidBusiness } from "react-icons/bi";

export default function UserList({ users }) {
  if (!users || users.length === 0) return <div>لا يوجد مستخدمين</div>;

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {users.map(user => (
        <div className="col" key={user._id || user.id}>
          <Link
            href={`/users/${user._id || user.id}`}
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            <div
              className="card h-100 shadow-sm border-1"
              style={{ backgroundColor: "var(--muted)", borderRadius: "10px" }}
            >
              <div className="card-body p-4 text-muted">
                <img
                  src={user.imageBase64 || "https://via.placeholder.com/150"}
                  alt={user.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "50%"
                  }}
                />
                <h5 className="card-title mb-3 fw-semibold" style={{ color: "var(--primary)" }}>
                  <FaUser className="me-2" />
                  {user.name}
                </h5>
                <p className="mb-2">
                  <strong style={{ color: "var(--secondary)" }}>Email: </strong>
                  {user.email}
                </p>
                <p className="mb-2">
                  <strong style={{ color: "var(--secondary)" }}>Phone: </strong>
                  {user.phone}
                </p>
                <p className="mb-2">
                  <strong style={{ color: "var(--secondary)" }}>City: </strong>
                  {user.address?.city}
                </p>
                <hr className="my-3" />
                <h6 style={{ color: "var(--primary)" }}>
                  <BiSolidBusiness className="me-2" />
                  {user.company?.name}
                </h6>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
