import '../App.css';
import avatar from "../avatar.svg";
export default function Header() {
  return (
    <header className=" header">
      <div className="">
        <h1>Sales Prospect</h1>
      </div>
      
      <div className="search">
        <input type="text" placeholder="Search ZURI" className="w-72 h-8 px-3 rounded-sm"/>
       

        </div>

        <div className="avatar">
          <img src={avatar} alt="avatar" />
        </div>
    

    </header>
  );
}
