import { Outlet } from "react-router-dom";
import Header from "./features/Header";

export default function AppLayout() {
  return (
    <div>
        <Header />
        <main className="app-main">
        <Outlet />
        </main>
    </div>
  )
}
