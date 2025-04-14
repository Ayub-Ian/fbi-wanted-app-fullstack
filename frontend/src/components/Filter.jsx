import { Form, useSearchParams, useSubmit } from "react-router";
import React, { useState, useRef } from "react";
import { useEffect } from "react";

const ApiWantedFilters = () => {
  const [searchParams] = useSearchParams();
  const submit = useSubmit();
  const formRef = useRef(null);

  const filterData = {
    person_classification: ["main", "victim"],
    sex: ["male", "female"],
  };

  const getInitialState = () => {
    const state = {
      person_classification:
        searchParams.get("person_classification")?.toLowerCase() || "",
      sex: searchParams.get("sex")?.toLowerCase() || "",
    };
    return state;
  };

  const [filters, setFilters] = useState(getInitialState());

  const handleRadioChange = (category, value) => {
    setFilters((prev) => ({ ...prev, [category]: value }));
  };

  const handleReset = () => {
    setFilters({
      person_classification: "",
      sex: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submit(new FormData(formRef.current), { method: "get" });
  };

  const formatLabel = (category) => {
    return category.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  useEffect(() => {
    if (
      formRef.current &&
      filters.person_classification === "" &&
      filters.sex === ""
    ) {
      submit(formRef.current, { method: "get" });
    }
  }, [filters, submit, formRef]);

  return (
    <div className="max-w-4xl mx-auto ">
      <h2>Filters</h2>
      <Form
        method="get"
        ref={formRef}
        className="space-y-6"
        onSubmit={handleSubmit}
      >
        {Object.entries(filterData).map(([category, values]) => (
          <div key={category} className="bg-white p-4 rounded-lg shadow-xs">
            <h3 className="font-medium text-gray-700 mb-3">
              {formatLabel(category)}
            </h3>
            <div className="flex flex-wrap gap-4">
              {values.map((value) => (
                <label key={value} className="inline-flex items-center">
                  <input
                    type="radio"
                    name={category}
                    value={value}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    checked={filters[category] === value}
                    onChange={() => handleRadioChange(category, value)}
                  />
                  <span className="ml-2 text-gray-700">
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reset all
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Apply Filters
          </button>
        </div>
      </Form>
    </div>
  );
};

export default ApiWantedFilters;
