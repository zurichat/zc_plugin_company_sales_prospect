import SearchIcon from "./svg/SearchIcon";
import SettingsIcon from "./svg/SettingsIcon";
import avatar from "../avatar.svg";
export default function Header() {
  return (
    <header className="">
      <div className="">
        <h1>Sales Prospect</h1>
      </div>
      <div className="">
        <input type="text" placeholder="search ZURI" />
        <SearchIcon />
        <SettingsIcon />
        <div className="avatar">
          <img src={avatar} alt="avatar" />
        </div>
      </div>
    </header>
  );
}
