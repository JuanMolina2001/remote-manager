import { terminalPage } from '@/pages'
import '@xterm/xterm/css/xterm.css';
import './style.css';
const routes: { [key: string]: (app: HTMLElement) => void } = {
  '': terminalPage,
  
};

function handleHashChange() {
  const path = window.location.hash || "";
  const app = document.getElementById("app")!
  routes[path]?.(app);
}

window.addEventListener("hashchange", handleHashChange);
handleHashChange();
