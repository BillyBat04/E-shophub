import { Link, useLocation } from "react-router-dom"
const NavItem = ({ item }) => {
	const location = useLocation();
	const { label, icon: Icon, link } = item
	function CustomComponent() {
		return (
			<Link
				to={link}
				className={`p-4 flex font-roboto text-sm justify-start items-center ${location.pathname.includes(link)
					? "bg-customBlack text-white rounded-lg"
					: "text-black"
					}`}
			>
				<Icon color={`${location.pathname.includes(link) ? "#ffffff" : "#000000"}`} className=" ml-12 mr-3 h-6 w-6" />
				{label}
			</Link>
		);
	}
	return (
		<li
			className="mb-8 mt-5 w-full ">
			<CustomComponent />
		</li>
	)
}

export default NavItem