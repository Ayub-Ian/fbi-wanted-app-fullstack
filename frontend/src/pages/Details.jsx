import WantedDetails from "@/components/WantedDetail";

function WantedDetailPage() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Danger Dossier</h1>
      </header>

      <WantedDetails />

      <footer className="app-footer">
        <p>
          This application uses FBI Wanted API data for demonstration purposes
          only.
        </p>
      </footer>
    </div>
  );
}

export default WantedDetailPage;
