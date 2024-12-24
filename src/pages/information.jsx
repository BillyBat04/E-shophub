import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import axiosInstance from "../config/api";
import formatDate from "../helpers/formatDate";
import axios from "axios";

export default function Information() {
    const {user} = useUser()
    const [customer, setCustomer] = useState()
    const [userInfo, setUserInfo] = useState({
        fullName: "John Doe",
        email: "johndoe@example.com",
        birthday: "01/01/2001",
        gender: "Male",
        phoneNumber: "123-456-7890",
        address: "123 Main St, Springfield",
        dateCreated: '00/00/0000'
    });
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [, setFile] = useState()
    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setSelectedAvatar(imageURL);
            setFile(file)
        }
        const data = new FormData()
        if (file) data.append('image', file)
        const response = await axios({
            method: 'PATCH',
            url: `http://localhost:3000/api/user/${user.id}`,
            data,
            headers: {'Content-Type': 'multipart/form-data'}
        })
        if (response.status === 200) {
            localStorage.setItem('user', JSON.stringify(response.data))
            window.location.reload();
        }
    };

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === "birthday") value = formatDate(value)
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
    };

    const handleSave = async (e) => {
        e.preventDefault()
        // eslint-disable-next-line no-unused-vars
        const { email, dateCreated, ...updatedUserInfo } = userInfo;
        await axiosInstance.patch(`/customer/${customer.id}`, updatedUserInfo)
        setIsEditing(false);
        window.location.reload()
    };

    useEffect(() => {
        const getUser = async () => {
            console.log(user.id)
            const response = await axiosInstance.get(`/customer/get-by-user/${user?.id}`)
            setCustomer(response.data)
            const existCustomer = response.data
            setUserInfo(() => ({
                fullName: existCustomer.fullName,
                email: user.email,
                birthday: existCustomer.birthday,
                gender: existCustomer.gender,
                phoneNumber: existCustomer.phoneNumber,
                address: existCustomer.address,
                dateCreated: formatDate(user.createdAt)
            }))
        }
        getUser()
    }, [user])

    return (
        <div className="w-full ml-6 gap-3 flex">
            <div className='w-1/3 h-full p-5 bg-white rounded-lg'>
                <h3 className="text-base mb-3 font-semibold">Avatar</h3>
                <div className="flex flex-col items-center">
                    <div className="h-32 w-32 mb-4 rounded-full overflow-hidden border-2 border-gray-300">
                        {selectedAvatar ? (
                            <img
                                src={selectedAvatar}
                                alt="Selected Avatar"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center">
                                <img
                                    src={user?.image}
                                    alt="Selected Avatar"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                    <label className="text-xs cursor-pointer bg-blue-500 text-white px-3 py-2 rounded-lg">
                        Select Avatar
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </label>
                </div>
            </div>

            <div className="w-2/3 mx-auto p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-base mb-3 font-semibold">Personal Information</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="fullName"
                                value={userInfo.fullName}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        ) : (
                            <p className="mt-1 text-gray-600">{userInfo.fullName}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        ) : (
                            <p className="mt-1 text-gray-600">{userInfo.email}</p>
                        )}
                    </div>

                    {/* Birthday */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Birthday</label>
                        {isEditing ? (
                            <input
                                type="date"
                                name="birthday"
                                value={userInfo.birthday}
                                onChange={handleChange}
                                placeholder={userInfo.birthday}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        ) : (
                            <p className="mt-1 text-gray-600">{userInfo.birthday}</p>
                        )}
                    </div>

                    {/* Sex */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Sex</label>
                        {isEditing ? (
                            <div className="flex items-center space-x-4">
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={userInfo.gender === "Male"}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    Male
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="sex"
                                        value="Female"
                                        checked={userInfo.gender === "Female"}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    Female
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="sex"
                                        value="Other"
                                        checked={userInfo.gender === "Other"}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    Other
                                </label>
                            </div>
                        ) : (
                            <p className="mt-1 text-gray-600">{userInfo.gender}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="phoneNumber"
                                value={userInfo.birthday}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        ) : (
                            <p className="mt-1 text-gray-600">{userInfo.phoneNumber}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="address"
                                value={userInfo.address}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        ) : (
                            <p className="mt-1 text-gray-600">{userInfo.address}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date created</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="dateCreated"
                                value={userInfo.dateCreated}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        ) : (
                            <p className="mt-1 text-gray-600">{userInfo.dateCreated}</p>
                        )}
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                    {isEditing ? (
                        <>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={e => handleSave(e)}
                                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
