import ApiWantedFilters from "@/components/Filter";
import WantedList from "@/components/WantedList";
import { useLoaderData } from "react-router";

function WantedListPage() {
  const wanted = useLoaderData();

  return (
    <div className="w-full min-h-screen bg-oat">
      <section className="min-h-96">
        <h1>Danger Dossier</h1>
      </section>

      <div className="flex border-t border-pepper mr-auto ml-auto">
        <aside className="z-30 border-r min-w-48 border-b border-pepper relative p-4 shrink basis-[25%]">
          <div className="max-h-[90dvh] pb-6 sticky overflow-y top-24">
            <p>Filters</p>
            <ApiWantedFilters />
          </div>
        </aside>
        <section className="flex-1 max-w-none min-w-28 relative">
          <h2 className="sr-only">All fbi wanted persons</h2>
          <WantedList wanted={wanted} />
        </section>
      </div>

      <footer className="app-footer">
        <p>
          This application uses FBI Wanted API data for demonstration purposes
          only.
        </p>
      </footer>
    </div>
  );
}

export default WantedListPage;
