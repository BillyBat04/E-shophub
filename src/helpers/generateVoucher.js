const generateVoucher = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 7; // Số ký tự của mã voucher
  let voucher = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    voucher += characters[randomIndex];
  }

  return voucher;
};
export default generateVoucher
