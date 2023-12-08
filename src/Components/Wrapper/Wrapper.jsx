/* eslint-disable react/prop-types */

import Animate from "../Layout/Animate";

const Wrapper = (props) => {
  return (
    <div className="hero-container-main">
      <div className="hero-background">
        <Animate />
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="mt-4 mb-4">
              <div
                className="card"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <div className="card-body">{props.children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
