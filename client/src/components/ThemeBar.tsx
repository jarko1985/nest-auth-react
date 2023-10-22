import React, { useEffect, useState } from 'react'
import { BsSun, BsMoon } from "react-icons/bs";
import { BiDesktop } from "react-icons/bi";
const ThemeBar = () => {
    const [theme, setTheme] = useState("system");
  const element = document.documentElement;
  const options = [
    {
      icon: <BsSun />,
      text: "light",
    },
    {
      icon: <BsMoon />,
      text: "dark",
    },
    {
      icon: <BiDesktop />,
      text: "system",
    },
  ];
  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem('theme','dark')
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem('theme','light')
        break;
      default:
        localStorage.removeItem('theme');
        break;
    }
  }, [theme]);
  return (
    <div className="fixed top-5 right-10 duration-150 dark:bg-slate-700 bg-gray-100 rounded">
    {options.map((option) => (
      <button
        key={option.text}
        onClick={() => setTheme(option.text)}
        className={`w-8 h-8 leading-9 text-xl rounded-full m-1 ${
          theme === option.text && "text-sky-600"
        }`}
      >
        {option.icon}
      </button>
    ))}
    
  </div>
  )
}

export default ThemeBar