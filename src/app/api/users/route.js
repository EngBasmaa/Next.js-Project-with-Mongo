// import dbConnect from "../../../_lib/dbConnection"; // لو عندك ملف اتصال بالقاعدة
// import User from "../../../models/user";

// export async function POST(req) {
//   try {
//     await dbConnect(); // توصيل بقاعدة البيانات

//     const data = await req.json();

//     const user = new User(data);

//     await user.save();

//     return new Response(JSON.stringify(user), { status: 201 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500
//     });
//   }
// }

// export async function GET(req) {
//   try {
//     await dbConnect();

//     const users = await User.find();

//     return new Response(JSON.stringify(users), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500
//     });
//   }
// }

import dbConnect from "../../../_lib/dbConnection";
import User from "../../../models/user";

export async function GET(req) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
      // لو جالنا id، نجيب المستخدم واحد فقط
      const user = await User.findById(id);
      if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), {
          status: 404
        });
      }
      return new Response(JSON.stringify(user), { status: 200 });
    }

    // لو مفيش id، نجيب كل المستخدمين
    const users = await User.find();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    });
  }
}

export async function POST(req) {
  try {
    await dbConnect();

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
