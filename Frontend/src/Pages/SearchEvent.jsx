const SearchEvent = () => {
    return (
      <>
        <div className="w-full z-10 bg-blue-800 flex justify-center items-center text-4xl
       text-white font-extrabold py-4 shadow-md mt-20">
          Events
        </div>
        <br/>
        <br/>
  
        <div className="flex justify-evenly">
          <div className="card bg-base-100 w-96 shadow-xl object-cover transition-transform transform hover:scale-110 hover:shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Wedding</h2>
              <p>Book your wedding venues</p>
            </div>
            <figure>
              <img src="https://placehold.co/600x400" alt="Photo" />
            </figure>
          </div>
  
          <div className="card bg-base-100 w-96 shadow-xl object-cover transition-transform transform hover:scale-110 hover:shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Live Concert</h2>
              <p>Book your tickets</p>
            </div>
            <figure>
              <img src="https://placehold.co/600x400" alt="Photo" />
            </figure>
          </div>
  
          <div className="card bg-base-100 w-96 shadow-xl object-cover transition-transform transform hover:scale-110 hover:shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Political Event</h2>
              <p>Participate in your favorite political event</p>
            </div>
            <figure>
              <img src="https://placehold.co/600x400" alt="Photo" />
            </figure>
          </div>
        </div>
  
        
        <br/>
        <br />
  
        <div className="flex justify-evenly">
          <div className="card bg-base-100 w-96 shadow-xl object-cover transition-transform transform hover:scale-110 hover:shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Educational Event</h2>
              <p>Participate in your favorite education session</p>
            </div>
            <figure>
              <img src="https://placehold.co/600x400" alt="Photo" />
            </figure>
          </div>
  
          <div className="card bg-base-100 w-96 shadow-xl object-cover transition-transform transform hover:scale-110 hover:shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Sports</h2>
              <p>Register your team or buy tickets.</p>
            </div>
            <figure>
              <img src="https://placehold.co/600x400" alt="Photo" />
            </figure>
          </div>
  
          <div className="card bg-base-100 w-96 shadow-xl object-cover transition-transform transform hover:scale-110 hover:shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Food festival</h2>
              <p>Book your tickets for the festival.</p>
            </div>
            <figure>
              <img src="https://placehold.co/600x400" alt="Photo" />
            </figure>
          </div>
        </div>
        <br/>
        <br/>
      </>
    );
  };
  
  export default SearchEvent;
  