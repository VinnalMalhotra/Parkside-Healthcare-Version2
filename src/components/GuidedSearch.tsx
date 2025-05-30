import { useSearchActions } from "@yext/search-headless-react";
import { FilterSearch } from "@yext/search-ui-react";
import { useState, useEffect } from "react";

const GuidedSearch = () => {
  const [service, setService] = useState("");
  const [locationDisplayName, setLocationDisplayName] = useState("");
  const [language, setLanguage] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const searchActions = useSearchActions();
  searchActions.setVertical("financial-professional");

  useEffect(() => {
    const executeSearch = () => {
      window.location.href = `/search.html?vertical=financial-professional&query=${service.replaceAll(
        " ",
        "+"
      )}+advisors+in+${locationDisplayName.replaceAll(
        " ",
        "+"
      )}+who+speak+${language.replaceAll(" ", "+")}`;
    };
    if (currentStep === 4) {
      setTimeout(executeSearch, 1000);
    }
  }, [currentStep]);

  return (
    <main className="flex flex-col pb-36 ">
      {currentStep === 1 && (
        <section className="flex flex-col gap-8 items-center pt-20 mb-12 text-secondary">
          <h2 className="text-2xl font-bold">
            Search by City and State or Zip Code
          </h2>
          <FilterSearch
            placeholder="Search location"
            customCssClasses={{
              filterSearchContainer:
                "border-secondary flex justify-center text-tertiary",
              inputElement:
                "rounded-full px-8 py-4 border-zinc-900 text-base placeholder:text-neutral-500 w-96 h-full text-tertiary",
              option: "py-2 px-4",
              highlighted: "font-bold text-base",
              nonHighlighted: "text-base",
              sectionLabel: "text-lg",
            }}
            onSelect={(params) => {
              setLocationDisplayName(params.newDisplayName);
              setCurrentStep(2);
            }}
            searchFields={[
              {
                fieldApiName: "builtin.location",
                entityType: "financialProfessional",
              },
            ]}
          />
        </section>
      )}
      {currentStep === 2 && (
        <section className="flex flex-col gap-8 items-center pt-20 text-secondary">
          <h2 className="text-2xl font-bold">
            What type of service are you looking for?
          </h2>
          <FilterSearch
            placeholder="Search Speciality"
            customCssClasses={{
              filterSearchContainer:
                "border-secondary flex justify-center text-tertiary",
              inputElement:
                "rounded-full px-8 py-4 border-zinc-900 text-base placeholder:text-neutral-500 w-96 h-full text-tertiary",
              option: "py-2 px-4",
              highlighted: "font-bold text-base",
              nonHighlighted: "text-base",
              sectionLabel: "text-lg",
            }}
            onSelect={(params) => {
              setService(params.newDisplayName);
              setCurrentStep(3);
            }}
            searchFields={[
              {
                fieldApiName: "specialities",
                entityType: "financialProfessional",
              },
            ]}
          />
        </section>
      )}
      {currentStep === 3 && (
        <section className="flex flex-col gap-8 items-center pt-20 text-secondary">
          <h2 className="text-2xl font-bold">
            What language do you prefer to speak?
          </h2>
          <FilterSearch
            placeholder="Search Language"
            customCssClasses={{
              filterSearchContainer:
                "border-secondary flex justify-center text-tertiary",
              inputElement:
                "rounded-full px-8 py-4 border-zinc-900 text-base placeholder:text-neutral-500 w-96 h-full text-tertiary",
              option: "py-2 px-4",
              highlighted: "font-bold text-base",
              nonHighlighted: "text-base",
              sectionLabel: "text-lg",
            }}
            onSelect={(params) => {
              setLanguage(params.newDisplayName);
              setCurrentStep(4);
            }}
            searchFields={[
              {
                fieldApiName: "languages",
                entityType: "financialProfessional",
              },
            ]}
          />
        </section>
      )}
      {currentStep === 4 && (
        <section className="flex flex-col gap-8 items-center pt-20 text-secondary">
          <h2 className="text-2xl font-bold">
            One moment, searching for advisors that match your criteria...
          </h2>
          <aside role="status" aria-live="polite">
            <svg
              aria-hidden="true"
              className="w-24 h-24 mr-2 text-gray-200 animate-spin fill-brand-blue"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </aside>
        </section>
      )}
    </main>
  );
};

export default GuidedSearch;
