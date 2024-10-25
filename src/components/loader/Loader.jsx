/* eslint-disable react/prop-types */
const Loader = ({ percent }) => {
  return (
    <div className="loader">
      <span className="loader-text">{percent}%</span>
    </div>
  );
};

export default Loader;
