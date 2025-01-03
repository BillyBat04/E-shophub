import { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { FaCircleCheck } from "react-icons/fa6";
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function Arrange() {
    const items = ["Low to high price", "High to low price"];
    const [selectedItem, setSelectedItem] = useState("Options"); 

    const handleSelect = (item) => {
        setSelectedItem(item); 
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <span className="truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[70px]">
                        {selectedItem}
                    </span>
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
                    {items.map((item, index) => (
                        <MenuItem key={index}>
                            {({ active }) => (
                                <button
                                    onClick={() => handleSelect(item)}
                                    className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                        }`}
                                >
                                    <div className='flex justify-between'>
                                        <span>{item}</span>
                                        {selectedItem === item && (
                                            <FaCircleCheck className='h-5 w-5 text-green-400'/>
                                        )}
                                    </div>
                                </button>
                            )}
                        </MenuItem>
                    ))}
                </div>
            </MenuItems>
        </Menu>
    );
}
