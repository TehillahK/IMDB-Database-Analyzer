import { constants } from "buffer";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import InputHero from "~/components/InputHero";
import OutputHero from "~/components/OutputHero";

const Home: NextPage = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("/api/topmovies");
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  const fetchNumEpisodes = async () => {
    try {
      const response = await fetch("/api/numepisodes");
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <InputHero
          getTopMovies={fetchData}
          numEpisodes = {fetchNumEpisodes}
          result={(reqResult: any) => {
            setResult(reqResult);
          }}
        />
        <OutputHero result={result} />
      </main>
    </>
  );
};

export default Home;
