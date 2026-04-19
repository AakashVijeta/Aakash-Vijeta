import { useEffect, useState } from "react";
import "../styles/ThemeToggle.css";

const STORAGE_KEY = "portfolio-theme";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "default";
  return window.localStorage.getItem(STORAGE_KEY) || "default";
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "f1") {
      root.setAttribute("data-theme", "f1");
    } else {
      root.removeAttribute("data-theme");
    }
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const attr = document.documentElement.getAttribute("data-theme");
      setTheme(attr === "f1" ? "f1" : "default");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const isF1 = theme === "f1";

  return (
    <div className="mode-switch" role="group" aria-label="Theme mode">
      <span className="mode-switch-key" aria-hidden="true">[T]</span>
      <button
        type="button"
        className={`mode-seg ${!isF1 ? "mode-seg--active" : ""}`}
        onClick={() => setTheme("default")}
        aria-pressed={!isF1}
      >
        TRM
      </button>
      <span className="mode-switch-div" aria-hidden="true">/</span>
      <button
        type="button"
        className={`mode-seg ${isF1 ? "mode-seg--active" : ""}`}
        onClick={() => setTheme("f1")}
        aria-pressed={isF1}
      >
        F1
      </button>
    </div>
  );
};

export default ThemeToggle;
