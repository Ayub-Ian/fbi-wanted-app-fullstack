import hero from "../assets/detective-desk.jpg";
import ApiWantedFilters from "@/components/Filter";
import SearchWantedPersons from "@/components/Search";
import WantedList from "@/components/WantedList";
import { useLoaderData } from "react-router";

function WantedListPage() {
  const wanted = useLoaderData();

  return (
    <div className="w-full min-h-screen bg-oat">
      <section className="min-h-96 relative flex items-center justify-center ">
        <div className="absolute inset-0">
          <img
            src={hero}
            className="h-full bg-no-repeat object-center object-fill w-full"
          />
        </div>

        <div className="z-50 text-center">
          <h1 className="z-10 text-4xl font-semibold mb-2">Danger Dossier</h1>
          <p className="z-10 ">Put your detective caps on !!</p>
        </div>
      </section>

      <div className="flex border-t border-pepper mr-auto ml-auto">
        <aside className="z-30 border-r min-w-48 border-b border-pepper relative p-4 shrink basis-[25%]">
          <div className="max-h-[90dvh] pb-6 sticky overflow-y top-8">
            <SearchWantedPersons />
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
