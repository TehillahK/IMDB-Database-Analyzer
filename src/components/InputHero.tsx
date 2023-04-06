/* eslint-disable */

import Link from 'next/link';

const InputHero = (props: any) => {
  
  const getTopMovies = props.getTopMovies;
 
  const getNumEpisodes = props.numEpisodes;
  
  const setResult = props.result;
 
  const getFemaleLedmovies = props.femaleLedMovies;
  
  const actorStats = props.actorWork;
  
  const isLoading = props.isLoading;
  
  const outputReady = props.outputReady;
  let movies: any;
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col text-center">
      <h1 className="text-5xl font-bold">COMP3380 GROUP 8 Project</h1>
        <div className="flex-row justify-between">
          <button
            className="btn-primary btn mr-2"
            onClick={async () => {
              movies = await getTopMovies();
              // console.log(movies);
              setResult(movies);
            }}
          >
            Get All 10 star movies
          </button>
          <button
            className="btn-primary btn  mr-2"
            onClick={async () => {
              movies = await getNumEpisodes();
              // console.log(movies);
              setResult(movies);
            }}
          >
            Num Episodes of TV Shows
          </button>

          <button
            className="btn-primary btn  mr-2"
            onClick={async () => {
              movies = await getFemaleLedmovies();
              // console.log(movies);
              setResult(movies);
            }}
          >
            Female led movies
          </button>

          <button
            className="btn-primary btn"
            onClick={async () => {
              movies = await actorStats();
              // console.log(movies);
              setResult(movies);
            }}
          >
            Actors who got the most work
          </button>
        </div>
        <div>
          <Link href={"/table"}>
            <button
            className="btn-secondary btn"
  
            >
            See individual tables
            </button>
          </Link>
          {isLoading && <p>Loading...</p>}
          {outputReady && (
            <p className="mt-4 text-green-500">Output is ready. scroll down!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputHero;
