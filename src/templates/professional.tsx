/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static HTML page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/pageLayout";
import {
  Address,
  getDirections,
  HoursStatus,
  HoursTable,
  Image,
  MapboxMaps,
  Marker,
} from "@yext/pages-components";
import LetsTalk from "../components/LetsTalk";
import Cta from "../components/cta";
import Blogs from "../components/relatedSections/Blogs";
import Carousel from "../components/Carousel";
import ScrollToTop from "../components/scrollToTop";
import StarRating from "../components/starRating";
import { HiOutlinePhone, HiOutlineMail } from "react-icons/hi";
import { format_phone } from "../utils/reusableFunctions";
import ThreeGridLayout from "../components/relatedSections/threeGridLayout";
import ReviewsComponent from "../components/ReviewsComponent";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-professional",
    fields: [
      "id",
      "uid",
      "slug",
      "name",
      "address",
      "mainPhone",
      "c_primaryCTA",
      "c_relatedBlogs.name",
      "c_relatedBlogs.bodyV2",
      "c_relatedBlogs.shortDescriptionV2",
      "c_relatedBlogs.primaryPhoto",
      "c_relatedBlogs.c_author",
      "c_relatedBlogs.datePosted",
      "c_relatedBlogs.slug",
      "c_educationDetails",
      "c_professionalRecord",
      "description",
      "emails",
      "headshot",
      "yearsOfExperience",
      "languages",
      "certifications",
      "yextDisplayCoordinate",
      "specialities",
      "conditionsTreated",
      "taxonomy_relatedSpecialties.name",
      "services",
      "educationList",
      "hours",
      "c_relatedPromo.id",
      "c_relatedPromo.name",
      "c_relatedPromo.c_backgroundImage",
      "c_relatedPromo.description",
      "c_relatedLocations.name",
      "c_relatedLocations.slug",
      "c_relatedLocations.address",
      "c_relatedLocations.mainPhone",
      "c_relatedLocations.hours",
      "c_relatedLocations.yextDisplayCoordinate",
      "c_relatedLocations.meta",
      "timezone",
      "c_relatedProducts.id",
      "c_relatedProducts.c_shortDescriptionV2",
      "c_relatedProducts.primaryPhoto",
      "c_relatedProducts.slug",
      "c_relatedProducts.name",
    ],
    filter: {
      entityTypes: ["healthcareProfessional"],
      savedFilterIds: ["1401364440"],
    },
    localization: {
      locales: ["en"],
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${document.address.line1
    }-${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and produce a HeadConfig object.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
    ],
  };
};

/**
 * This is the main template component. The props passed in here are the direct stream document defined by `config`.
 */
const Professional: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    name,
    address,
    mainPhone,
    description,
    slug,
    c_primaryCTA,
    c_relatedBlogs,
    educationList,
    c_professionalRecord,
    taxonomy_relatedSpecialties,
    emails,
    headshot,
    yearsOfExperience,
    _site,
    languages,
    certifications,
    specialities,
    conditionsTreated,
    services,
    yextDisplayCoordinate,
    hours,
    id,
    c_relatedLocations,
    __meta,
    c_relatedProducts,
    c_relatedPromo,
    timezone,
  } = document;

  const professionalLocations = [
    {
      address: address,
      hours: hours,
      mainPhone: mainPhone,
      name: address.city,
      yextDisplayCoordinate: yextDisplayCoordinate,
      slug: "#",
    },
    ...(Array.isArray(c_relatedLocations)
      ? c_relatedLocations
      : [c_relatedLocations]),
  ];

  const email =
    (emails && emails.length >= 1 && emails[0]) || `contact@contact.com`;

console.log(JSON.stringify(taxonomy_relatedSpecialties))
console.log(JSON.stringify(educationList))
  return (
    <PageLayout _site={_site} templateData={{ __meta, document }}>
      <section className="centered-container flex flex-col md:h-[500px] md:flex-row md:justify-between gap-4 md:gap-0">
        <article className="flex flex-col w-full md:w-1/2 gap-3 md:gap-4">
          <h1 className="text-2xl md:text-5xl font-bold">{name}</h1>

          <span className="flex items-center gap-2">
            <p className="font-bold">4.5</p>
            <span className="gap-0.5 flex">
              <StarRating selectedStars={4.5} />
            </span>
            <span className="font-normal">(21 reviews)</span>
          </span>
          <p>{description}</p>
          <nav className="flex flex-col md:flex-row gap-4">
            <Cta
              ctaType="secondaryCta"
              cta={{ label: "Book appointment", linkType: "URL", link: "" }}
              hours={hours}
              name={name}
              otherStyles="border-2 font-bold px-4"
              isBookAnAppointment={true}
            />
          </nav>
        </article>
        <Image
          image={headshot}
          className="!aspect-square w-full md:!w-1/3 rounded-lg max-w-none !my-0"
        />
      </section>

      {(yearsOfExperience || educationList?.length || taxonomy_relatedSpecialties?.length || conditionsTreated?.length || certifications?.length || languages?.length) && (
        <section className="bg-accent">
          <section className="centered-container">
            <h2 className="text-2xl md:text-4xl font-bold text-center">
              Professional Details
            </h2>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Column 1 */}
              <article className="flex flex-col gap-4">
                {yearsOfExperience && (
                  <section className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold">Experience</h3>
                    <p className="text-tertiary">{yearsOfExperience} Years</p>
                  </section>
                )}

                {educationList?.length > 0 &&
                  educationList.map((item: any, index: number) => (
                    <div key={index} className="space-y-1">
                      <div className="text-base font-semibold">
                        {item.type?.includes('_') ? item.type.split('_').join(' / ') : item.type}
                      </div>
                      <div className="text-sm text-gray-700">
                        {item.institutionName} {item.yearCompleted && `– ${item.yearCompleted}`}
                      </div>
                    </div>
                  ))}
              </article>

              {/* Column 2 */}
              <article className="flex flex-col gap-4">
                {taxonomy_relatedSpecialties?.length > 0 && (
                  <section className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold">Specialties</h3>
                    <ul className="list-disc pl-4 marker:text-secondary space-y-2">
                      {taxonomy_relatedSpecialties.map((item: any, index: number) => (
                        <li key={index}>{item.name}</li>
                      ))}
                    </ul>
                  </section>
                )}
                {conditionsTreated?.length > 0 && (
                  <section className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold">Condition Treated</h3>
                    <ul className="list-disc pl-4 marker:text-secondary space-y-2">
                      {conditionsTreated.map((item: string[], index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </section>
                )}
              </article>

              {/* Column 3 */}
              <article className="flex flex-col gap-4">
                {certifications?.length > 0 && (
                  <section className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold">Licenses and Certifications</h3>
                    <ul className="list-disc pl-4 marker:text-secondary space-y-2">
                      {certifications.map((item: string[], index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </section>
                )}
                {languages?.length > 0 && (
                  <section className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold">Languages</h3>
                    <ul className="list-disc pl-4 marker:text-secondary space-y-2">
                      {languages.map((item: string[], index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </section>
                )}
              </article>
            </section>
          </section>
        </section>
      )}


      {/* Featured Promo Section */}
      {c_relatedPromo && (
        <section className="centered-container">
          <section className="flex flex-col md:h-[400px] md:flex-row md:justify-between gap-4 md:gap-16">
            {c_relatedPromo?.length > 0 && (
              <Image
                image={c_relatedPromo[0]?.c_backgroundImage}
                className="w-full md:!w-1/2 max-w-none"
              />
            )}

            <article className="flex flex-col justify-center w-full md:w-1/2 gap-8 text-left items-start">
              <h2 className="text-2xl md:text-4xl font-bold">Featured Promotion</h2>

              <div className="flex flex-grow items-center w-full">
                <p className="text-left">{c_relatedPromo[0].description}</p>
              </div>

              <nav>
                <button className="font-bold md:text-lg bg-secondary text-white w-full md:w-fit p-2 md:px-4 flex items-center justify-center border rounded-full">
                  Learn more
                </button>
              </nav>

              <section className="flex gap-4 justify-center">
                <a
                  href="https://apps.apple.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="w-[119px] h-10"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Download_on_the_App_Store_RGB_blk.svg/2560px-Download_on_the_App_Store_RGB_blk.svg.png"
                    alt="Download on the App Store"
                  />
                </a>
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="w-[119px] h-10"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                    alt="Get it on Google Play"
                  />
                </a>
              </section>
            </article>
          </section>
        </section>
      )}




      <section className="bg-accent">
        {c_relatedProducts &&
          <ThreeGridLayout
            titleAlignment="center"
            title={`Speciality`}
            relatedItems={c_relatedProducts}
            ctaCount={1}
          />}
      </section>
      <section className="centered-container md:space-y-16">
        <header className=" space-y-2 text-center">
          <h2 className="text-2xl md:text-4xl font-bold">Recent Reviews</h2>
          <span className="flex items-center justify-center gap-2">
            <p className="font-bold">4.5</p>
            <span className="gap-0.5 flex">
              <StarRating selectedStars={4.5} />
            </span>
            <span className="font-normal">(21 reviews)</span>
          </span>
        </header>
        <ReviewsComponent />
      </section>
      <section className="bg-accent">
        {c_relatedBlogs &&
          <Blogs
            linkedArticles={c_relatedBlogs}
            parentEntityName={name}
            title={"Insights"}
          />}
      </section>

      {professionalLocations &&
        <ThreeGridLayout
          titleAlignment="center"
          title={`My Locations`}
          relatedItems={professionalLocations}
        />}
      <ScrollToTop />
    </PageLayout>
  );
};

export default Professional;

{
  /* <section className="centered-container flex flex-col w-full mx-auto items-start text-secondary py-8">
        <article className="flex  flex-col md:flex-row gap-2 items-start md:items-center">
          <h1 className="text-2xl md:text-3xl font-medium">{name}</h1>
        </article>

        <article className="mt-4 flex flex-col md:flex-row w-full items-stretch shrink-0 mx-auto  gap-4">
          <article className="w-full md:w-3/4 flex flex-col md:flex-row gap-4">
            <figure className="w-full md:w-1/5">
              <Image image={headshot} loading="eager" />
            </figure>
            <section className=" flex-col flex gap-4 w-full md:w-4/5">
              <h2 className="sr-only">About me</h2>
              <h2 className="text-2xl md:text-3xl font-medium text-secondary">
                About {name}
              </h2>
              <p className="text-tertiary text-sm md:text-base">
                {description}
              </p>
            </section>
          </article>
          <aside className="w-1/5 h-auto hidden md:flex mx-auto flex-col justify-center text-center px-4 py-12 bg-accent">
            <p>
              Need an expert financial guidance to help you achieve your goals?
            </p>
            <article className="md:flex gap-8  hidden">
              <Cta
                cta={{
                  label: "Book an appointment",
                  link: "#",
                  linkType: "URL",
                }}
                ctaType="primaryCta"
                otherStyles="w-full text-sm mt-4 mx-auto"
              />
            </article>
          </aside>
        </article>
        <article className="md:hidden flex justify-center gap-8 mx-auto mt-4">
          <Cta
            ctaType="primaryCta"
            cta={{ label: "Book appointment", linkType: "URL", link: "" }}
            hours={hours}
            name={name}
            otherStyles="w-full"
            isBookAnAppointment={true}
          />
        </article>
      </section>
      <section className="w-full py-8 bg-accent">
        <article className="centered-container flex flex-col w-full mx-auto items-center gap-4 md:gap-8">
          <h2 className="sr-only">Professional Details</h2>
          <h2 className="text-secondary text-2xl md:text-4xl font-bold mx-auto text-center">
            Professional Details
          </h2>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <section className="flex flex-col gap-4">
              <section>
                <h3  className="text-2xl  font-medium">
                  Experience
                </h3>
                <p className="text-tertiary">{yearsOfExperience} Years</p>
              </section>
              {c_educationDetails && (
                <section>
                  <h3 className="text-lg md:text-xl font-medium text-secondary">
                    Education Details
                  </h3>
                  <ul className="list-disc pl-4 marker:text-secondary space-y-2">
                    {c_educationDetails.map((item: any, index: number) => (
                      <li key={index}>
                        {item.degree} - {item.university}, {item.year}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {languages && (
                <section>
                  <h3 className="text-lg md:text-xl font-medium text-secondary">
                    Languages
                  </h3>
                  <ul className="list-disc pl-4 marker:text-secondary space-y-2">
                    {languages.map((item: string[], index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}
            </section>
            <section className="flex flex-col gap-4">
              {certifications && (
                <section>
                  <h3 className="text-lg md:text-xl font-medium text-secondary">
                    Licenses and Certifications
                  </h3>
                  <ul className="list-disc pl-4 marker:text-secondary space-y-2">
                    {certifications.map((item: string[], index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}
              {specialities && (
                <section>
                  <h3 className="text-lg md:text-xl font-medium text-secondary">
                    Specialities
                  </h3>
                  <ul className="list-disc pl-4 marker:text-secondary space-y-2">
                    {specialities.map((item: string[], index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}
            </section>
            {c_professionalRecord && (
              <section>
                <h3 className="text-lg md:text-xl font-medium text-secondary">
                  Professional Journey
                </h3>
                <ul className="list-disc pl-4 marker:text-secondary space-y-2">
                  {c_professionalRecord.map((item: any, index: number) => (
                    <li className="flex" key={index}>
                      {item.position}
                      {item.organisation ? ` - ${item.organisation}` : ""},{" "}
                      {item.startYear && item.startYear}
                      {item.endYear && ` - ${item.endYear}`}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </section>
        </article>
      </section>
      {c_relatedBlogs && (
        <article className="py-8 flex flex-col md:justify-center w-full mx-auto items-center ">
          <Blogs
            linkedArticles={c_relatedBlogs}
            parentEntityName={name}
            title={"Blogs"}
          />
        </article>
      )}
      <section className="bg-accent w-full py-8">
        <article className="hidden md:block centered-container">
          <Carousel
            cardsToShow={{ desktop: 3, mobile: 1, tablet: 2 }}
            data={professionalLocations}
            title={"My Locations"}
            isLocation={true}
          />
        </article>
        <article className="block md:hidden">
          <Carousel
            cardsToShow={{ desktop: 3, mobile: 1, tablet: 2 }}
            data={professionalLocations}
            title={"My Locations"}
            isLocation={true}
          />
        </article>
      </section>
      <section className="bg-primary  md:text-center w-full py-8">
        <LetsTalk
          description={description}
          phone={mainPhone}
          email={email}
          geoCodedCoordinate={yextDisplayCoordinate}
          cta={c_primaryCTA}
        />
      </section> */
}
