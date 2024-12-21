const formatDate = (date) => {
    const newDate = new Date(date);

    const day = String(newDate.getDate()).padStart(2, '0');
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const year = newDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate
}

export default formatDate