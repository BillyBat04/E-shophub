function formatNumber(number) {
    let numberStr = number.toString();
    
    const regex = /(\d)(?=(\d{3})+(?!\d))/g;
    return numberStr.replace(regex, '$1.');
}
export default formatNumber