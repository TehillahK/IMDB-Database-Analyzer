const InputHero = (props: any) => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <textarea className="textarea textarea-bordered py-6" placeholder="Enter query">
            
          </textarea>
          <button className="btn-primary btn">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default InputHero;
