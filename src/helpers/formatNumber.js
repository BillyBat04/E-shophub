function formatNumber(number) {
    if (typeof number !== 'number') {
        throw new Error('Input must be a number');
    }

    // Chuyển số thành chuỗi và sử dụng regex để thêm dấu "."
    const numberStr = number.toFixed(0); // Đảm bảo không có phần thập phân
    const regex = /(\d)(?=(\d{3})+(?!\d))/g;
    return numberStr.replace(regex, '$1.') + ' VND';
}

export default formatNumber;
