import { useState, useEffect } from "react";

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Lỗi khi phân tích thông tin người dùng:", error);
      }
    }
  }, []);

  const updateUser = (newUser) => {
    // Cập nhật thông tin người dùng vào localStorage
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return { user, updateUser, clearUser };
};

export default useUser;