import { getMessaging, getToken } from "firebase/messaging";
import { app } from "./firebase";

export const getFirebaseMessaging = () => {
  if (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator
  ) {
    return getMessaging(app);
  }

  return null;
};

export async function getFCMToken() {
  try {
    

    const messaging = getFirebaseMessaging();

if (!messaging) {
  console.log("Messaging not supported");
  return;
}

const token = await getToken(messaging, {
  vapidKey: "BLmC0ZF9bEi1XUbwKrrFqhwiWPjd2ycZIHCPevjnXQyGpBUGNImBZdgsPqAsvbqd6_Jc8lOp0FJXFJ2517TfDtg",

});

    return token;
  } catch (error) {
    console.error(error);
    return null;
  }
}