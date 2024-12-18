/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
const NavItem = ({ item }) => {
	const { label, icon, active, link } = item
	function CustomComponent() {
		return (
			<Link to={link} className=" h-[45px] sm:w-[70px] md:w-[160px] flex sm:justify-center md:justify-start items-center">
				<img src={icon}
					className="ml-5 mr-3 h-6 w-6" />
				<label className="hidden text-black md:block font-roboto text-sm">
					{label}
				</label>
			</Link>
		);
	}
	function CustomClickedComponent() {
		return (
			<Link to={`${link}`} className=" h-[45px] sm:w-[70px] md:w-[160px] flex sm:justify-center md:justify-start items-center">
				<img src={icon}
					className="ml-5 mr-3 h-6 w-6" />
				<label className="hidden md:block font-roboto text-sm border-b-[1px] border-black">
					{label}
				</label>
			</Link>
		);
	}
	return (
		<li
			className="mb-8 mt-5 w-full ">
			{active ? <CustomClickedComponent /> : <CustomComponent />}
		</li>
	)
}

export default NavItem