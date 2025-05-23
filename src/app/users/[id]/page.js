// // app/users/[id]/page.js

// import { getUserById } from "../../../_lib/data-service"; // غيري المسار حسب مكان السرفس
// import { notFound } from "next/navigation";
// import { FaUser } from "react-icons/fa";
// import { BiSolidBusiness } from "react-icons/bi";

// export default async function UserDetails({ params }) {
//   const { id } = params;
//   const user = await getUserById(id);

//   if (!user) return notFound(); // لو مفيش يوزر، نعرض صفحة 404

//   return (
//     <div className="container pt-5 pb-5">
//       <h2 className="text-center mb-5 fw-bold" style={{ color: "var(--primary)" }}>
//         User Details
//       </h2>

//       <div
//         className="card mx-auto shadow-sm border-1"
//         style={{ maxWidth: "600px", backgroundColor: "var(--muted)", borderRadius: "12px" }}
//       >
//         <div className="card-body p-4 text-muted">
//           <h4 className="fw-bold mb-4" style={{ color: "var(--primary)" }}>
//             <FaUser className="me-2" />
//             {user.name}
//           </h4>

//           <p>
//             <strong style={{ color: "var(--secondary)" }}>Email:</strong> {user.email}
//           </p>
//           <p>
//             <strong style={{ color: "var(--secondary)" }}>Phone:</strong> {user.phone}
//           </p>
//           <p>
//             <strong style={{ color: "var(--secondary)" }}>Username:</strong> {user.username}
//           </p>
//           <p>
//             <strong style={{ color: "var(--secondary)" }}>Website:</strong> {user.website}
//           </p>

//           <hr className="my-3" />

//           <p>
//             <strong style={{ color: "var(--secondary)" }}>City:</strong> {user.address?.city}
//           </p>
//           <p>
//             <strong style={{ color: "var(--secondary)" }}>Street:</strong> {user.address?.street}
//           </p>
//           <p>
//             <strong style={{ color: "var(--secondary)" }}>Zipcode:</strong> {user.address?.zipcode}
//           </p>

//           <hr className="my-3" />

//           <h6 style={{ color: "var(--primary)" }}>
//             <BiSolidBusiness className="me-2" />
//             {user.company?.name}
//           </h6>
//           <p className="fst-italic">{user.company?.catchPhrase}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation"; // أو useParams لو Next.js يدعمها
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { BiSolidBusiness } from "react-icons/bi";

export default function UserPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // استخرج المعرف من الرابط (path)
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // مثال سريع

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  if (loading) return <div>Loading user...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;

  return (
    <div className="container pt-5 pb-5">
        <div className="container page pt-5 pb-5">
        <h2 className="text-center mb-5 fw-bold" style={{ color: "var(--primary)" }}>
          User Details
        </h2>

        <div
          className="card mx-auto shadow p-4 border-0"
          style={{ maxWidth: "600px", backgroundColor: "var(--muted)", borderRadius: "10px" }}
        >
          <h4 className="fw-bold mb-4" style={{ color: "var(--primary)" }}>
            <FaUser className="me-2" />
            {user?.name}
          </h4>

          <p><strong style={{ color: "var(--secondary)" }}>Phone:</strong> {user?.phone}</p>
          <p><strong style={{ color: "var(--secondary)" }}>Email:</strong> {user?.email}</p>
          <p><strong style={{ color: "var(--secondary)" }}>Address:</strong> {user?.address?.city}</p>
          <p><strong style={{ color: "var(--secondary)" }}>Website:</strong> {user?.website}</p>

          <hr className="my-4" />

          <h5 style={{ color: "var(--primary)" }}>
            <BiSolidBusiness className="me-2" />
            {user?.company?.name}
          </h5>
          <p style={{ color: "var(--secondary)" }}>{user?.company?.catchPhrase}</p>
        </div>
      </div>

      <Link href="/users" className="btn btn-secondary">
        Back to Users
      </Link>
    </div>
  );
}
