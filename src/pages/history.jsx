import { Typography } from '@material-tailwind/react';
import { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../config/api';
import formatDate from '../helpers/formatDate';
import ModalOrder from '../components/modalorder';

const History = () => {
    const [selectedTab, setSelectedTab] = useState('Tất cả');
    const [orderList, setOrderList] = useState([]);
    const [invoiceId, setInvoiceId] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const getList = useCallback(async () => {
        const response = await axiosInstance.get('/invoice');
        setOrderList(response.data);
    }, []);

    useEffect(() => {
        getList();
    }, [getList]);

    const handleSelectTab = async (tab) => {
        setSelectedTab(tab);
        let newTab = '';
        switch (tab) {
            case 'Đang xử lý':
                newTab = 'PROCESSING';
                break;
            case 'Đang vận chuyển':
                newTab = 'SHIPPING';
                break;
            case 'Hoàn thành':
                newTab = 'COMPLETED';
                break;
            case 'Đã hủy':
                newTab = 'CANCELED';
                break;
            default:
                break;
        }
        if (tab === 'Tất cả') {
            getList();
        } else {
            const response = await axiosInstance.get(`/invoice/filter-list/${newTab}`);
            const list = response.data;
            setOrderList(list);
        }
    };

    const TABLE_HEAD = ['No', 'Invoice Date', 'Total Price', 'Address', 'Status'];

    return (
        <div className="flex items-center flex-col w-full ml-6">
            <div className="bg-white shadow-md py-4 w-[80%] rounded-full justify-center flex items-center space-x-7 mb-4">
                {['Tất cả', 'Đang xử lý', 'Đang vận chuyển', 'Hoàn thành', 'Đã hủy'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => handleSelectTab(tab)}
                        className={`px-8 py-2 text-sm rounded-full ${selectedTab === tab ? 'bg-black text-white' : 'text-black'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Orders table */}
            <div className="w-full min-w-max table-auto text-center bg-white p-4 rounded-md">
                <table className="w-full min-w-max table-auto text-center">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={head}
                                    className={`border-r-[4px] border-white bg-customGray3 pb-4 pt-4
                                            ${index === 0 ? 'rounded-l-2xl' : ''}
                                            ${index === TABLE_HEAD.length - 1 ? 'rounded-r-2xl' : ''}`}
                                >
                                    <Typography variant="small" color="blue-gray" className="font-bold leading-none">
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {orderList.map((row, index) => {
                            const isLast = index === orderList.length - 1;
                            const classes = isLast ? 'py-4' : 'py-4 border-b border-gray-300';

                            return (
                                <tr key={row.id} className="hover:bg-gray-50">
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-bold">
                                            {index + 1}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-normal text-gray-600">
                                            {formatDate(row.invoiceDate)}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-normal text-gray-600">
                                            {row.totalPrice}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-normal text-gray-600">
                                            {row.address}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-normal text-gray-600">
                                            {row.status}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-normal text-white">
                                            <button
                                                onClick={() => {
                                                    setInvoiceId(row.id);
                                                    setIsOpen((prevState) => !prevState);
                                                }}
                                                className="bg-black w-20 h-6 rounded-xl"
                                            >
                                                Detail
                                            </button>
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {isOpen && <ModalOrder isOpen={isOpen} setIsOpen={setIsOpen} invoiceId={invoiceId} />}
            </div>
        </div>
    );
};

export default History;
