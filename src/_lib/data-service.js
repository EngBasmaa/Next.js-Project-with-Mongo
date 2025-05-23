import { dbConnection } from "./dbConnection";
import User from "../models/user";

export async function getAllUsers() {
  await dbConnection();
  return User.find({});
}

export async function getUserById(id) {
  await dbConnection();
  return User.findOne({ id: Number(id) });
}

export async function addUser(newUser) {
  await dbConnection();
  const lastUser = await User.findOne({}).sort({ id: -1 });
  const newId = lastUser ? lastUser.id + 1 : 1;
  const user = new User({ ...newUser, id: newId });
  await user.save();
  return user;
}

export async function updateUser(id, updatedUser) {
  await dbConnection();
  return User.findOneAndUpdate({ id: Number(id) }, updatedUser, { new: true });
}

export async function deleteUser(id) {
  await dbConnection();
  return User.findOneAndDelete({ id: Number(id) });
}
