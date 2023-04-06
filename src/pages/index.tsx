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
  const [outputReady, setOutputReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // add isLoading state

  const fetchData = async () => {
    try {
      setOutputReady(false);
      setIsLoading(true);
      const response = await fetch("/api/topmovies");
      const data = await response.json();
      // console.log(data);
      setIsLoading(false);
      setOutputReady(true);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  const fetchNumEpisodes = async () => {
    try {
      setOutputReady(false);
      setIsLoading(true);
      const response = await fetch("/api/numepisodes");
      const data = await response.json();
      // console.log(data);
      setIsLoading(false);
      setOutputReady(true);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const fetchFemaleLedMoives = async () => {
    try {
      setOutputReady(false);
      setIsLoading(true);
      const response = await fetch("/api/femaleled");
      const data = await response.json();
      // console.log(data);
      setIsLoading(false);
      setOutputReady(true);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const fetchActorStats = async () => {
    try {
      setOutputReady(false);
      setIsLoading(true);
      const response = await fetch("/api/actorwork");
      const data = await response.json();
      // console.log(data);
      setIsLoading(false);
      setOutputReady(true);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  return (
    <>
      <Head>
        <title>Comp3380 Project</title>
        <meta name="description" content="Comp3380 project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <InputHero
          getTopMovies={fetchData}
          numEpisodes={fetchNumEpisodes}
          femaleLedMovies={fetchFemaleLedMoives}
          actorWork={fetchActorStats}
          isLoading={isLoading}
          outputReady={outputReady}
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
