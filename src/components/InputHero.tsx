const InputHero = (props: any) => {
  const getTopMovies = props.getTopMovies;
  const getNumEpisodes = props.numEpisodes;
  const setResult = props.result;
  let movies:any ;
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col text-center">
        <h1 className="text-5xl font-bold">Hello there</h1>
        <textarea
          className="textarea-bordered textarea py-6"
          placeholder="Enter query"
         
        ></textarea>
        <button className="btn-primary btn"
                onClick={
                  async ()=>{
                    movies = await getTopMovies();
                   // console.log(movies);
                   setResult(movies);
                  }
                }
        >Get Top Movies</button>
        <button
         className="btn-primary btn"
         onClick={
          async ()=>{
            movies = await getNumEpisodes();
           // console.log(movies);
           setResult(movies);
          }
        }
        >Num Episodes of TV Shows</button>
      </div>
    </div>
  );
};

export default InputHero;
