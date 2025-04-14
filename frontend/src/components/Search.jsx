import { useState } from "react";
import { useRef } from "react";
import { Form, useSubmit } from "react-router";

const SearchWantedPersons = () => {
  const submit = useSubmit();
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    submit(new FormData(formRef.current), { method: "get" });
  };

  return (
    <div className="w-full mt-0.5 mb-4">
      <Form method="get" ref={formRef} onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Search title"
          maxLength="256"
          className=" bg-white border border-gray-50 min-h-14 max-w-lg mx-auto px-4 text-sm flex relative items-center justify-between w-full rounded-sm bg-no-repeat search"
        />
        <input type="submit" hidden />
      </Form>
    </div>
  );
};

export default SearchWantedPersons;
