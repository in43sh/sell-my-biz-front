const Subscribe = () => {
  return (
    <div className="container-fluid bg-secondary my-5">
      <div className="row justify-content-md-center px-xl-5 py-5">
        <div className="col-md-6 col-12 py-5">
          <div className="mb-2 pb-2 text-center">
            <h2 className="section-title mb-3 px-5">
              <span className="bg-secondary px-2">Stay Updated</span>
            </h2>
            <p>
              Amet lorem at rebum amet dolores. Elitr lorem dolor sed amet diam
              labore at justo ipsum eirmod duo labore labore.
            </p>
          </div>
          <form action="">
            <div className="input-group">
              <input
                type="text"
                className="form-control border-white p-4"
                placeholder="Email Goes Here"
              />
              <div className="input-group-append">
                <button className="btn btn-primary px-4">Subscribe</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
