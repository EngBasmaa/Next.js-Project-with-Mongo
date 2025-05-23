// import { dbConnection } from "../../../_lib/dbConnection";
// import User from "../../../models/user";

// export async function GET(request) {
//   await dbConnection();

//   try {
//     const users = await User.find();
//     return new Response(JSON.stringify(users), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ message: "فشل في جلب المستخدمين" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

// export async function POST(request) {
//   await dbConnection();

//   try {
//     const body = await request.json();

//     if (!body.name || !body.email) {
//       return new Response(JSON.stringify({ message: "الاسم والبريد الإلكتروني مطلوبان" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const lastUser = await User.findOne().sort({ id: -1 });
//     const newId = lastUser ? lastUser.id + 1 : 1;

//     const newUser = new User({
//       id: newId,
//       name: body.name,
//       email: body.email,
//       phone: body.phone || "",
//       website: body.website || "",
//       address: {
//         city: body.address?.city || "",
//         country: body.address?.country || "",
//       },
//       company: {
//         name: body.company?.name || "",
//         catchPhrase: body.company?.catchPhrase || "",
//       },
//       imageBase64: body.imageBase64 || "",
//     });

//     await newUser.save();

//     return new Response(JSON.stringify(newUser), {
//       status: 201,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ message: "حدث خطأ أثناء حفظ المستخدم" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

import dbConnect from "../../../_lib/dbConnection"; // لو عندك ملف اتصال بالقاعدة
import User from "../../../models/user";

export async function POST(req) {
  try {
    await dbConnect(); // توصيل بقاعدة البيانات

    const data = await req.json();

    const user = new User(data);

    await user.save();

    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    });
  }
}

export async function GET(req) {
  try {
    await dbConnect();

    const users = await User.find();

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    });
  }
}
