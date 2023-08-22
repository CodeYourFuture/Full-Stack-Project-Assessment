import cinema from "../cinema.png";
const Welcome = () => {
  return (
    <>
      <section className="bg-dark text-light p-5 p-lg-0  text-center text-sm-start">
        <div className="container">
          <div className="d-sm-flex align-items-center justify-content-between">
            <div>
              <h1>
                Welcome to <span className="text-info"> VideoWorld </span>
              </h1>
              <p className="lead my-4">
                Discover and enjoy videos with us. Watch, vote, and even create
                your own list of favorite videos. We're all about having fun
                with videos together. Join in!
              </p>
            </div>
            <img
              className="img-fluid w-50 d-none d-sm-block"
              src={cinema}
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Welcome;
