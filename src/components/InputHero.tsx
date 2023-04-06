const InputHero = (props: any) => {
  const getTopMovies = props.getTopMovies;
  const getNumEpisodes = props.numEpisodes;
  const setResult = props.result;
  const getFemaleLedmovies = props.femaleLedMovies;
  let movies: any;
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col text-center">
        <div className="flex-row justify-between">
          <button
            className="btn-primary btn mr-2"
            onClick={async () => {
              movies = await getTopMovies();
              // console.log(movies);
              setResult(movies);
            }}
          >
            Get All 5 star movies
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
              movies = await getFemaleLedmovies();
              // console.log(movies);
              setResult(movies);
            }}
          >
            Actors who got the most work
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputHero;
