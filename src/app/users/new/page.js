"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUserPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    city: "",
    country: "",
    companyName: "",
    catchPhrase: "",
    imageBase64: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleCreate = async e => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("الرجاء إدخال بريد إلكتروني صحيح");
      return;
    }

    setLoading(true);

    try {
      let imageBase64 = "";
      if (imageFile) {
        imageBase64 = await toBase64(imageFile);
      }

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        address: { city: formData.city, country: formData.country },
        company: {
          name: formData.companyName,
          catchPhrase: formData.catchPhrase
        },
        imageBase64
      };

      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to add user");

      await res.json();

      alert("✅ User added successfully!");
      router.push("/users"); // أو الصفحة اللي تعرض المستخدمين
    } catch (error) {
      alert("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen max-w-screen-md mx-auto p-8">
      <h1 className="text-center text-3xl font-semibold mb-8">Add New User</h1>
      <form
        onSubmit={handleCreate}
        className="flex flex-col gap-4 border p-6 rounded-lg"
      >
        {[
          { name: "name", type: "text", required: true },
          { name: "email", type: "email", required: true },
          { name: "phone", type: "text" },
          { name: "website", type: "text" },
          { name: "city", type: "text" },
          { name: "country", type: "text" },
          { name: "companyName", type: "text" },
          { name: "catchPhrase", type: "text" }
        ].map(({ name, type, required }) =>
          <input
            key={name}
            type={type}
            name={name}
            placeholder={name[0].toUpperCase() + name.slice(1)}
            value={formData[name]}
            onChange={handleChange}
            required={required}
            className="border rounded px-3 py-2"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border rounded px-3 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add User"}
        </button>
      </form>
    </main>
  );
}
