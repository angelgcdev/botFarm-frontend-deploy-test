const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const logout = async () => {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include", // 👈 IMPORTANTE: permite manejar cookies
  });

  return res;
};

export { logout };
