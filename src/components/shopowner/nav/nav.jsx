import React from "react"
import NavItem from "./navitem"

const NavItemsContainer = ({ items }) => (
	<>
		{items?.map((item, index) => (
			<NavItem item={item} key={index} />
		))}
	</>
)
const Nav = ({ items }) => {
	return (
		<nav className='flex justify-start items-center'>
			<ul>
				<NavItemsContainer items={items} />
			</ul>
		</nav>
	)
}
export default Nav
