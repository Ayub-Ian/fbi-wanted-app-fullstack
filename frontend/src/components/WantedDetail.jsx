import DOMPurify from "dompurify";
import { Link, useLoaderData } from "react-router";
import { FaRegFilePdf } from "react-icons/fa";
import LazyImage from "./LazyImage";

const WantedDetails = () => {
  const wantedPerson = useLoaderData();

  if (!wantedPerson) return <div className="error">No person data found</div>;

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
    files,
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
                  <LazyImage imageSrc={images[0].original} alt={title} />
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
                  {aliases && Array.isArray(aliases) && aliases.length > 0 ? (
                    <ul>
                      {aliases.map((alias, index) => (
                        <li key={index}>{alias}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>Not specified</p>
                  )}
                </DetailedItemContainer>
              </div>
              <div className="border-b border-pepper">
                <DetailedItemContainer title="field offices">
                  {field_offices &&
                  Array.isArray(field_offices) &&
                  field_offices.length > 0 ? (
                    <ul>
                      {field_offices.map((office, index) => (
                        <li key={index}>{office}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>Not specified</p>
                  )}
                </DetailedItemContainer>
              </div>
              <div className="border-b border-pepper">
                <DetailedItemContainer title="Date of Birth Used">
                  {dates_of_birth_used &&
                  Array.isArray(dates_of_birth_used) &&
                  dates_of_birth_used.length > 0 ? (
                    <ul>
                      {dates_of_birth_used.map((dob, index) => (
                        <li key={index}>{dob}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>Not specified</p>
                  )}
                </DetailedItemContainer>
              </div>
              <div className="border-b border-pepper">
                <DetailedItemContainer title="Subjects">
                  {subjects &&
                  Array.isArray(subjects) &&
                  subjects.length > 0 ? (
                    <ul>
                      {subjects.map((subject, index) => (
                        <li key={index}>{subject}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>Not specified</p>
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
              <DetailedItemContainer title="Files and Documents">
                {files && Array.isArray(files) && files.length > 0 ? (
                  <ul>
                    {files.map((file, index) => (
                      <Link
                        className="underline text-blue-700 flex items-center gap-2"
                        to={file.url}
                        key={index}
                      >
                        <FaRegFilePdf />
                        {file.name} - {title}
                      </Link>
                    ))}
                  </ul>
                ) : (
                  <p>Not specified</p>
                )}
              </DetailedItemContainer>
            </div>
          </div>
        </div>

        <div className=" border-t border-pepper">
          <div className="grid grid-cols-3">
            <div className="border-r  border-pepper">
              <DetailedItemContainer title="caution">
                {caution ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(caution),
                    }}
                  />
                ) : (
                  <p> Not Specified</p>
                )}
              </DetailedItemContainer>
            </div>
            <div>
              <DetailedItemContainer title="description">
                {description}
              </DetailedItemContainer>
            </div>
            <div className="border-l  border-pepper">
              <DetailedItemContainer title="remarks">
                {remarks || "Not Specified"}
              </DetailedItemContainer>
            </div>
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
                <p>{nationality || "Not Specified"}</p>
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
        <div className="border-t border-pepper">
          <DetailedItemContainer title="remarks">
            {remarks ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(remarks),
                }}
              />
            ) : (
              <p> Not Specified</p>
            )}
          </DetailedItemContainer>
        </div>
        <div className="border-t border-b border-pepper">
          <div className="grid grid-cols-12 [&>div:not(:last-child)]:border-r   *:border-pepper last:border-r-0">
            {images.map((image, index) => {
              return (
                <div className="relative h-36 w-auto" key={index}>
                  <LazyImage
                    className="absolute inset-0 w-full size-full"
                    imageSrc={image.thumb}
                    alt={title}
                  />
                </div>
              );
            })}
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
