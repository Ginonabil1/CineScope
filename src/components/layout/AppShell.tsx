import { Outlet } from "react-router-dom";
import WatchlistToast from "../common/WatchlistToast";
import Header from "./Header";

const AppShell = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_28%),linear-gradient(180deg,_#020617_0%,_#0f172a_48%,_#020617_100%)] text-white">
      <Header />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-5 pb-16 pt-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <WatchlistToast />
    </div>
  );
};

export default AppShell;
