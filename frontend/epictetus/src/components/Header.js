
import avatar from "../avatar.svg";
export default function Header() {
  return (
    <header className=" header">
      <div className="">
        <h1>Sales Prospect</h1>
      </div>
      
      <div className="search">
        <input type="text" placeholder="search ZURI"  />
       

        </div>

        <div className="avatar">
          <img src={avatar} alt="avatar" />
        </div>
    

    </header>
  );
}
