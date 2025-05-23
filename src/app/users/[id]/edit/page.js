import UserForm from "@/components/userForm";

async function fetchUser(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export default async function EditUserPage({ params }) {
  const user = await fetchUser(params.id);

  const handleUpdate = async formData => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    alert("User updated!");
  };

  return <UserForm initialData={user} onSubmit={handleUpdate} />;
}
