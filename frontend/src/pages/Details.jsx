import Footer from "@/components/Footer";
import WantedDetails from "@/components/WantedDetail";
import { useNavigate } from "react-router";

function WantedDetailPage() {
  const navigate = useNavigate();
  return (
    <div className="app">
      <button onClick={() => navigate(-1)}>Go Back</button>
      <WantedDetails />

      <Footer />
    </div>
  );
}

export default WantedDetailPage;
