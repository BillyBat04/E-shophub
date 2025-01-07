import { useEffect, useState } from "react";

const FallingHoaMai = () => {
  const [hoaMaiArray, setHoaMaiArray] = useState([]);

  useEffect(() => {
    const createHoaMai = () => {
      const hoaMai = {
        id: Math.random(),
        left: Math.random() * window.innerWidth,
        animationDuration: Math.random() * 3 + 2, // 2-5 giây
        size: Math.random() * 20 + 10, // 10-30px
      };
      setHoaMaiArray((prev) => [...prev, hoaMai]);

      // Xóa hoa mai sau khi hoàn thành animation
      setTimeout(() => {
        setHoaMaiArray((prev) => prev.filter((item) => item.id !== hoaMai.id));
      }, hoaMai.animationDuration * 1000);
    };

    const interval = setInterval(createHoaMai, 300); // Tạo hoa mai mới mỗi 300ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
      {hoaMaiArray.map((hoaMai) => (
        <div
          key={hoaMai.id}
          className="absolute"
          style={{
            left: `${hoaMai.left}px`,
            animationDuration: `${hoaMai.animationDuration}s`,
            width: `${hoaMai.size}px`,
            height: `${hoaMai.size}px`,
          }}
        >
          <img
            src="/src/assets/hoa-mai.png"
            alt="hoa mai"
            className="w-full h-full animate-fall"
          />
        </div>
      ))}
    </div>
  );
};

export default FallingHoaMai;
