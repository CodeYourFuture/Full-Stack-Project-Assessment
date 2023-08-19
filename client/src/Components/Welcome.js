import logo from "../logo.png";
const Welcome = () => {
  return (
    <>
      <section class="bg-dark text-light p-5 p-lg-0  text-center text-sm-start">
        <div class="container">
          <div class="d-sm-flex align-items-center justify-content-between">
            <div>
              <h1>
                Welcome to <span class="text-info"> VideoWorld </span>
              </h1>
              <p class="lead my-4">
                Discover and enjoy videos with us. Watch, vote, and even create
                your own list of favorite videos. We're all about having fun
                with videos together. Join in!
              </p>
            </div>
            <img class="img-fluid w-50 d-none d-sm-block" src={logo} alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Welcome;
