import '../App.css';
import Avatar from "./svg/Avatar.svg";
export default function Header() {
  return (
    <header className="px-10 py-3 w-full md:flex justify-between items-center hidden ">
      <div className="w-1/2">
        <input type="text" className="border border-gray-300 rounded outline-none mr-4 px-3 py-1.5 hidden sm:block sm:w-full" placeholder="Search here" />
      </div>
      <div className="font-bold text-2xl">
        <img src={Avatar} alt="user-avatar"/>
      </div>
    </header>
  );
}
