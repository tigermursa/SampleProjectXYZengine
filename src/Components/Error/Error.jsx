import React from "react";
import { useSpring, animated } from "react-spring";
import "./Error.css";

const Error = () => {
  // Animation config
  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 300,
  });

  const slideInProps = useSpring({
    transform: "translateY(0)",
    from: { transform: "translateY(-20px)" },
    delay: 500,
  });

  return (
    <div>
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="col-sm-10 col-sm-offset-1 text-center">
                <animated.div className="four_zero_four_bg" style={fadeInProps}>
                  <h1 className="text-center text-yellow-700 font-bold">404</h1>
                </animated.div>

                <animated.div className="contant_box_404" style={slideInProps}>
                  <h3 className="h2 text-xl">I advised you not to click.</h3>
                  <p className="text-xl">the page you are looking for is not available!!</p>
                  <a href="/" className="link_404">
                    Go to Home
                  </a>
                </animated.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Error;
