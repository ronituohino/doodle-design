// Loaned this idea from:
// https://stackoverflow.com/questions/56826626/create-dynamic-svg-icons-component-in-reactjs
// Thanks!

import AddIcon from "@mui/icons-material/Add";
import AppsIcon from "@mui/icons-material/Apps";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import BarChartIcon from "@mui/icons-material/BarChart";
import CampaignIcon from "@mui/icons-material/Campaign";
import CategoryIcon from "@mui/icons-material/Category";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import ClearIcon from "@mui/icons-material/Clear";
import CreateIcon from "@mui/icons-material/Create";
import EditIcon from "@mui/icons-material/Edit";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import LanguageIcon from "@mui/icons-material/Language";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import ShieldIcon from "@mui/icons-material/Shield";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const iconTypes = {
  AddIcon,
  AppsIcon,
  ArrowDropDownIcon,
  BarChartIcon,
  CampaignIcon,
  CategoryIcon,
  CheckroomIcon,
  ClearIcon,
  CreateIcon,
  EditIcon,
  ExpandLess,
  ExpandMore,
  FastfoodIcon,
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
  KeyboardIcon,
  KeyboardReturnIcon,
  LanguageIcon,
  LocalShippingIcon,
  LoginIcon,
  LogoutIcon,
  MenuIcon,
  PersonAddIcon,
  PersonIcon,
  SearchIcon,
  ShieldIcon,
  ShoppingCartIcon,
  VisibilityIcon,
  VisibilityOffIcon,
};

const Icon = ({ name, ...props }) => {
  let RenderedIcon = iconTypes[name];
  return <RenderedIcon {...props} />;
};

export default Icon;
