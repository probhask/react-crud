import { Request, Response } from "express";
import {
  addUserSchema,
  deleteUserSchema,
  editUserSchema,
} from "../utils/joiSchema";
import { catchErrorResponse, routeResponse } from "../utils/routeResponse";
import { getFileData, saveFileData } from "../utils/fileOperation";

import { USER_DATA } from "../../../client/src/type";
import { randomUUID } from "node:crypto";

// 1️⃣ get list of user GET request
export const getListOfUser = async (req: Request, res: Response) => {
  try {
    const users = await getFileData();
    if (users) {
      res.status(200).json(users);
      return;
    }
    routeResponse(res, false, 500, "Something went wrong! Please try again");
    return;
  } catch (error) {
    catchErrorResponse(res, error);
  }
};

// 2️⃣ add new user POST request
export const addUser = async (req: Request, res: Response) => {
  const { username, email, dob } = req.body;
  try {
    // check parameter
    const result = addUserSchema.validate({ username, email, dob });
    if (result.error) {
      routeResponse(res, false, 400, result?.error.details[0].message);
      return;
    }

    const newUser: USER_DATA = {
      id: randomUUID(),
      username,
      email,
      dob,
    };

    const usersList = await getFileData();
    const newUsersList = [...usersList, newUser];
    await saveFileData(newUsersList);
    // routeResponse(res, true, 200, "User added successfully");
    res.status(200).json({ success: true, user: newUser });
    return;
  } catch (error) {}
};

// 3️⃣ edit user PUT request
export const editUser = async (req: Request, res: Response) => {
  const { id, username, email, dob } = req.body;
  try {
    const result = editUserSchema.validate({ id, username, email, dob });
    if (result.error) {
      routeResponse(res, false, 400, result?.error.details[0].message);
      return;
    }

    const usersList = await getFileData();
    const updatedUserList = usersList.map((user) => {
      if (user.id === id) {
        return { id, username, email, dob };
      }
      return user;
    });

    await saveFileData(updatedUserList);
    routeResponse(res, true, 200, "User updated successfully");
    return;
  } catch (error) {
    catchErrorResponse(res, error);
  }
};

// 4️⃣ remove user DELETE request
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    const result = deleteUserSchema.validate({ id });
    if (result.error) {
      routeResponse(res, false, 400, result?.error.details[0].message);
      return;
    }

    const usersList = await getFileData();
    const updatedUserList = usersList.filter((user) => user.id !== id);
    await saveFileData(updatedUserList);
    routeResponse(res, true, 200, "User removed successfully");

    return;
  } catch (error) {
    catchErrorResponse(res, error);
  }
};
