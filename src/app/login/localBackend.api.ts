const NEXT_PUBLIC_LOCAL_BACKEND_URL = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL;

interface UserData {
  user_id: number;
}

const sendUserIdApi = async (data: UserData) => {
  const res = await fetch(`${NEXT_PUBLIC_LOCAL_BACKEND_URL}/identify-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};

export { sendUserIdApi };
