"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import UserList from "../../components/userList/page"; // مكون عرض المستخدمين

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("فشل في جلب المستخدمين");

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container pt-5 pb-5">
      <h2
        className="text-center mb-5 fw-bold"
        style={{ color: "var(--primary)" }}
      >
        All Users
      </h2>

      <Link
        href="/users/new"
        className="btn btn-primary"
        style={{
          backgroundColor: "var(--primary)",
          borderColor: "var(--primary)",
          padding: "0.5rem 1.5rem",
          marginBottom: "3rem"
        }}
      >
        Add User
      </Link>

      {loading
        ? <div>Loading...</div>
        : error
          ? <div className="text-danger">
              Error: {error}
            </div>
          : <UserList users={users} />}
    </div>
  );
}
