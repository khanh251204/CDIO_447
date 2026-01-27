import { Outlet } from "react-router-dom";
import { Header } from "../Component/Layouts/Header";
import { Footer } from "../Component/Layouts/Footer";
import { SideBar } from "../Component/Layouts/SideBar";
import style from './PrivateLayout.module.css';
const PrivateLayout = () => {
  return (
    <>

      {/* Main layout */}
      <div className= {style.main}>
            {/* Sidebar */}
            <div className={style.sidebar}>
          <SideBar />
        </div>

        {/* Nội dung trang */}
        <div className={`content with-sidebar ${style.content}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default PrivateLayout;
