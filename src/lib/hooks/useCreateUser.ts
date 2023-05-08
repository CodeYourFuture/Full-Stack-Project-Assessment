import { request } from "graphql-request";
import { useState } from "react";
import { useQuery } from "react-query";

import { AddUserDocument } from "../../generated/graphql";

export default function useCreateUser() {
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId")
  );
  useQuery("addUser", async () => {
    if (!userId) {
      const { addUser } = await request(
        "http://localhost:3000/api/graphql",
        AddUserDocument
      );
      setUserId(addUser.id);
      localStorage.setItem("userId", addUser.id);
    }
  });
  return userId;
}
