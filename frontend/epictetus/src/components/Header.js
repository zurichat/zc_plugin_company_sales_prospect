import '../App.css';
import avatar from "../avatar.svg";
export default function Header() {
  return (
    <header className="p-4 w-full flex justify-between items-center">
      <div className="font-bold text-2xl">
        <h1>Sales Prospect</h1>
      </div>

      <div className="flex justify-between">
        <input type="text" className="border border-gray-300 rounded-md outline-none mr-4 p-3 hidden sm:block sm:w-96" placeholder="Search ZURI" />
        <img src={avatar} alt="avatar" />
      </div>

    </header>
  );
}
