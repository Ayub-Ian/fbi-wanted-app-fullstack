// import { getWantedPerson } from "@/data/mock";
import { useState, useEffect } from "react";

const WantedDetails = ({ personId }) => {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getWantedPerson(personId);

        // Check if we have person data with required fields
        if (!data || !data.title) {
          throw new Error("Invalid person data received");
        }

        setPerson(data);
      } catch (err) {
        console.error("Error fetching person data:", err);
        setError("Failed to load wanted person details");
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [personId]);

  if (loading)
    return <div className="loading">Loading wanted person details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!person) return <div className="error">No person data found</div>;

  // Safely extract person data with defaults
  const {
    title = "Unknown Person",
    images = [],
    description = "",
    aliases = [],
    dates_of_birth_used = [],
    place_of_birth = "",
    hair_raw = "",
    eyes_raw = "",
    height_min,
    height_max,
    weight_min,
    weight_max,
    sex = "",
    race_raw = "",
    nationality = "",
    scars_and_marks = "",
    reward_text = "",
    remarks = "",
    caution = "",
    details = "",
    additional_information = "",
    field_offices = [],
    publication = "",
    occupations = [],
    possible_countries = [],
    subjects = [],
    physical = {},
    uid = "Unknown",
  } = person;

  const mainImage = images[0]?.url || "";
  const fingerprints =
    images.filter((img) => img.caption?.includes("fingerprint")) || [];
  const datePublished = publication
    ? new Date(publication).toLocaleDateString()
    : "Unknown";

  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col relative justify-center">
        <div className=" border-t border-pepper">
          <div className="grid grid-cols-3">
            <div className="border-r  border-pepper">
              {mainImage ? (
                <img src={mainImage} alt={`${title}-mugshot`} className="" />
              ) : (
                <div className="no-photo">No photograph available</div>
              )}
            </div>
            <div>
              <div>
                <p>{title}</p>
              </div>
              <div>
                <span>Aliases</span>
                <p>{aliases.join(", ")}</p>
              </div>
              <div>
                <span>Field office</span>
                <p>{aliases.join(", ")}</p>
              </div>
              <div>
                <span>DOB</span>
                <p>{aliases.join(", ")}</p>
              </div>
            </div>
            <div className="border-l  border-pepper">Information</div>
          </div>
        </div>
        <div className=" border-t border-pepper">
          <div className="grid grid-cols-3">
            <div className="border-r  border-pepper">Image</div>
            <div>Text</div>
            <div className="border-l  border-pepper">Information</div>
          </div>
        </div>
        <div className=" border-t border-pepper">
          <div className="grid grid-cols-6 [&>div:not(:last-child)]:border-r  *:border-pepper last:border-r-0">
            <div>
              <p>{physical.distinguishingFeatures}</p>
            </div>
            <div>
              <p>{physical.height}</p>
            </div>
            <div>
              <p>{physical.weight}</p>
            </div>
            <div>
              <p>{physical.eyes}</p>
            </div>

            <div>
              <p>{physical.hair}</p>
            </div>
            <div>
              <p>{physical.race}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WantedDetails;
