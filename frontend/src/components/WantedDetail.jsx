// import { getWantedPerson } from "@/data/mock";
import DOMPurify from "dompurify";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router";

const WantedDetails = ({ personId }) => {
  const wantedPerson = useLoaderData();

  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchPerson = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);
  //       const data = await getWantedPerson(personId);

  //       // Check if we have person data with required fields
  //       if (!data || !data.title) {
  //         throw new Error("Invalid person data received");
  //       }

  //       setPerson(data);
  //     } catch (err) {
  //       console.error("Error fetching person data:", err);
  //       setError("Failed to load wanted person details");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPerson();
  // }, [personId]);

  // if (loading)
  //   return <div className="loading">Loading wanted person details...</div>;
  // if (error) return <div className="error">{error}</div>;
  if (!wantedPerson) return <div className="error">No person data found</div>;

  // Safely extract person data with defaults
  const {
    title = "Unknown Person",
    images = [],
    description = "",
    aliases = "Not Specified",
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
  } = wantedPerson;

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
              <DetailedItemContainer title="Original photo">
                {images.length != 0 ? (
                  <img src={images[0].original} alt={title} className="" />
                ) : (
                  <div className="no-photo">No photograph available</div>
                )}
              </DetailedItemContainer>
            </div>
            <div>
              <div className="border-b border-pepper">
                <DetailedItemContainer title="Fullname - area">
                  <p>{title}</p>
                </DetailedItemContainer>
              </div>
              <div className="border-b border-pepper">
                <DetailedItemContainer title="aliases">
                  {aliases ?? <p>Not specified</p>}
                  {aliases && Array.isArray(aliases) && aliases.length > 0 && (
                    <ul>
                      {aliases.map((alias, index) => (
                        <li key={index}>{alias}</li>
                      ))}
                    </ul>
                  )}
                </DetailedItemContainer>
              </div>
              <div className="border-b border-pepper">
                <DetailedItemContainer title="field offices">
                  {field_offices ?? <p>Not specified</p>}
                  {field_offices &&
                    Array.isArray(field_offices) &&
                    field_offices.length > 0 && (
                      <ul>
                        {field_offices.map((office, index) => (
                          <li key={index}>{office}</li>
                        ))}
                      </ul>
                    )}
                </DetailedItemContainer>
              </div>
              <div className="border-b border-pepper">
                <DetailedItemContainer title="Date of Birth Used">
                  {dates_of_birth_used ?? <p>Not specified</p>}
                  {dates_of_birth_used &&
                    Array.isArray(dates_of_birth_used) &&
                    dates_of_birth_used.length > 0 && (
                      <ul>
                        {dates_of_birth_used.map((dob, index) => (
                          <li key={index}>{dob}</li>
                        ))}
                      </ul>
                    )}
                </DetailedItemContainer>
              </div>
            </div>
            <div className="border-l  border-pepper">
              <DetailedItemContainer title="Additional information">
                {additional_information ? (
                  <p>{additional_information}</p>
                ) : (
                  <p>No specific additional information provided.</p>
                )}
              </DetailedItemContainer>
            </div>
          </div>
        </div>

        <div className=" border-t border-pepper">
          <div className="grid grid-cols-3">
            <div className="border-r  border-pepper">
              <DetailedItemContainer title="caution">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(caution),
                  }}
                />
              </DetailedItemContainer>
            </div>
            <div>
              <DetailedItemContainer title="description">
                {description}
              </DetailedItemContainer>
            </div>
            <div className="border-l  border-pepper">Information</div>
          </div>
        </div>
        <div className=" border-t border-pepper">
          <div className="grid grid-cols-6 [&>div:not(:last-child)]:border-r  *:border-pepper last:border-r-0">
            <div>
              <DetailedItemContainer title="Scars and marks">
                <p>{scars_and_marks || "Not specified"}</p>
              </DetailedItemContainer>
            </div>
            <div>
              <DetailedItemContainer title="height">
                <p>{height_max}</p>
              </DetailedItemContainer>
            </div>
            <div>
              <DetailedItemContainer title="gender">
                <p>{sex || "Note specified"}</p>
              </DetailedItemContainer>
            </div>
            <div>
              <DetailedItemContainer title="eye color">
                <p>{eyes_raw || "Not specified"}</p>
              </DetailedItemContainer>
            </div>

            <div>
              <DetailedItemContainer title="hair color">
                <p>{hair_raw || "Not specified"}</p>
              </DetailedItemContainer>
            </div>
            <div>
              <DetailedItemContainer title="race">
                <p>{race_raw || "Not specified"}</p>
              </DetailedItemContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WantedDetails;

function DetailedItemContainer({ title, children }) {
  return (
    <div className="detailed-item px-4">
      <h3>{title}</h3>
      {children}
    </div>
  );
}
