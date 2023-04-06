import { constants } from "buffer";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import InputHero from "~/components/InputHero";
import OutputHero from "~/components/OutputHero";

const Table: NextPage = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    "people",
    "title",
    "actor",
    "CastMember",
    "Director",
    "titleGenre",
    "languages",
    "TitleType",
    "Ratings",
    "TvEpisode",
    "types",
    "writer",
    "genres",
  ]; // predefined options

  function handleOptionChange(event: any) {
    setSelectedOption(event.target.value);
  }
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    
    const response = await fetch("/api/query", {
      method: "POST",
      body: JSON.stringify({ userInput: selectedOption }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setResult(data)
    console.log(data);
  };
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <form onSubmit={handleSubmit}>
                <label>
                  Choose an option:
                  <select value={selectedOption} onChange={handleOptionChange}>
                    <option value="">--Select an option--</option>{" "}
                    {/* default blank option */}
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <p>You have selected: {selectedOption}</p>
                <button className="btn" type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
        <OutputHero result={result} />
      </main>
    </>
  );
};

export default Table;
