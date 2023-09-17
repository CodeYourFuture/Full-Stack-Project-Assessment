// version 3
import React, { useState } from "react";
import "./navbar.css";

const Navbar = () => {
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });

      // Close the menu after clicking a menu item
      if (isMenuClicked) {
        updateMenu();
      }
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <nav>
        <div className="burger-menu" onClick={updateMenu}>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
        </div>
      </nav>

      <div className={menu_class}>
        <ul>
          <li>
            <a href="#body" onClick={() => scrollToSection("body")}>
              Home
            </a>
          </li>
          <li>
            <a
              href="#google-maps"
              onClick={() => scrollToSection("google-maps")}
            >
              Map
            </a>
          </li>
          <li>
            <a href="#footer" onClick={() => scrollToSection("footer")}>
              Footer
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

// version 2 the menubar does not close after clicked
// import React, { useState } from "react";
// import "./navbar.css";

// const Navbar = () => {
//   const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
//   const [menu_class, setMenuClass] = useState("menu hidden");
//   const [isMenuClicked, setIsMenuClicked] = useState(false);

//   const updateMenu = () => {
//     if (!isMenuClicked) {
//       setBurgerClass("burger-bar clicked");
//       setMenuClass("menu visible");
//     } else {
//       setBurgerClass("burger-bar unclicked");
//       setMenuClass("menu hidden");
//     }
//     setIsMenuClicked(!isMenuClicked);
//   };

//   const scrollToSection = (sectionId) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <div style={{ width: "100%" }}>
//       <nav>
//         <div className="burger-menu" onClick={updateMenu}>
//           <div className={burger_class}></div>
//           <div className={burger_class}></div>
//           <div className={burger_class}></div>
//         </div>
//       </nav>

//       <div className={menu_class}>
//         <ul>
//           <li>
//             <a href="#body" onClick={() => scrollToSection("body")}>
//               Home
//             </a>
//           </li>
//           {/* <li>
//             <a
//               href="#crypto-donation"
//               onClick={() => scrollToSection("crypto-donation")}
//             >
//               Crypto Donation
//             </a>
//           </li>
//           <li>
//             <a
//               href="#video-recommendation"
//               onClick={() => scrollToSection("video-recommendation")}
//             >
//               Video Recommendation
//             </a>
//           </li> */}
//           <li>
//             <a
//               href="#google-maps"
//               onClick={() => scrollToSection("google-maps")}
//             >
//               Map
//             </a>
//           </li>
//           <li>
//             <a href="#footer" onClick={() => scrollToSection("footer")}>
//               Footer
//             </a>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// version 1 All works but menu not connected to page landings
// import React, { useState } from "react"; // https://www.youtube.com/watch?v=gAGcjlJyKk0
// import "./navbar.css";

// const Navbar = () => {
//   // to change burger classes
//   const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
//   const [menu_class, setMenuClass] = useState("menu-hidden");
//   const [isMenuClicked, setIsMenuClicked] = useState(false);

//   // toggle burger menu change
//   const updateMenu = () => {
//     if (!isMenuClicked()) {
//       setBurgerClass("burger-bar clicked");
//       setMenuClass("menu visible");
//     } else {
//       setBurgerClass("burger-bar unclicked");
//       setMenuClass("menu hidden");
//     }
//     setIsMenuClicked(!isMenuClicked);
//   };

//   return (
//     <div style={{ width: "100%" }}>
//       <nav>
//         <div className="burger-menu" onClick={updateMenu}>
//           <div className={burger_class}></div>
//           <div className={burger_class}></div>
//           <div className={burger_class}></div>
//         </div>
//       </nav>

//       <div className={menu_class}></div>
//     </div>
//   );
// };

// export default Navbar;
