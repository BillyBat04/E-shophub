/* eslint-disable react/prop-types */
import { useState } from "react";
import { Avatar, Menu, MenuItem, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const UserAvatarDropdown = ({image}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Đăng xuất");
    // Thêm logic đăng xuất tại đây
    handleCloseMenu();
  };

  const handleProfile = () => {
    console.log("Xem thông tin cá nhân");
    // Thêm logic hiển thị thông tin cá nhân tại đây
    handleCloseMenu();
  };

  const handleOrderTracking = () => {
    console.log("Theo dõi đơn hàng");
    // Thêm logic theo dõi đơn hàng tại đây
    handleCloseMenu();
  };

  return (
    <div>
      <IconButton onClick={handleOpenMenu} size="large" color="inherit">
        <Avatar alt="avatar" src={image}>
          {/* <AccountCircleIcon /> */}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleProfile}>
          <Typography>Thông tin</Typography>
        </MenuItem>
        <MenuItem onClick={handleOrderTracking}>
          <Link to='/personal'>
            <Typography>Theo dõi đơn hàng</Typography>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography>Đăng xuất</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};
export default UserAvatarDropdown