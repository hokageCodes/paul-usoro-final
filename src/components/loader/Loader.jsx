/* eslint-disable react/prop-types */
const Loader = ({ percent }) => {
  return (
    <div className="loader-container">
      <div className="loader">
        <span className="loader-text">{percent}%</span>
      </div>
    </div>
  );
};

export default Loader;