import KeyHints from './KeyHints';
import ThemeToggle from './ThemeToggle';
import '../styles/BottomBar.css';

export default function BottomBar() {
  return (
    <div className="bottom-bar">
      <KeyHints />
      <ThemeToggle />
    </div>
  );
}
