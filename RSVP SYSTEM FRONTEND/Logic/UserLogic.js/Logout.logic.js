import { Client, Account } from "appwrite";
import { PROJECT_ID, API_ENDPOINT } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import client from "../../appwrite.config.js";


function logoutLogic() {

    const router = useRouter();

    const logout = async () => {

    const account = new Account(client);

    try {
      const logoutResponse = await account.deleteSessions();
      console.log(logoutResponse);
      AsyncStorage.removeItem("token");
        router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
  return { logout };
}

export default logoutLogic;
