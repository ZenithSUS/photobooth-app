import { account } from "../../appwrite";

export default async function fetchAuthUser(user: boolean) {
  try {
    if (!user) return false;
    const session = await account.getSession("current");
    if (session.current) {
      localStorage.setItem("session", JSON.stringify(session.current));
      user = session.current;
      const data = await account.get();

      localStorage.setItem("id", JSON.stringify(data.$id));
      localStorage.setItem("name", JSON.stringify(data.name));
      localStorage.setItem("email", JSON.stringify(data.email));
      localStorage.setItem("joined", JSON.stringify(data.$createdAt));
    } else {
      localStorage.clear();
      account.deleteSession("current");
      user = false;
    }
    return user;
  } catch (error) {
    localStorage.clear();
    account.deleteSession("current");
    return false;
  }
}
