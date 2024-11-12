import { USER_DATA } from "./../../../client/src/type.d";
import fs from "node:fs/promises";
import path from "path";

// file name
const dbFileName = path.join(__dirname, "../db/user.json");

//  read file
export const getFileData = async (): Promise<USER_DATA[]> => {
  const rawFileContent = await fs.readFile(dbFileName, {
    encoding: "utf-8",
  });
  const data = JSON.parse(rawFileContent);
  return data?.user || [];
};
// write file
export const saveFileData = async (data: USER_DATA[]) => {
  await fs.writeFile(dbFileName, JSON.stringify({"user":data}));
};
