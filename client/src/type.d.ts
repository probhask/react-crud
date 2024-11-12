export type USER_DATA = {
  id: string;
  username: string;
  email: string;
  dob: Date;
};
export type USER_WITHOUT_ID = Omit<USER_DATA, "id">;
