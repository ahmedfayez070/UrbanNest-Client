import "./listSkeleton.scss";

const ListSkeleton = () => {
  return (
    <div className="list-skeleton">
      <div className="item">
        <div className="bounce"></div>
        <div className="left"></div>
        <div className="right">
          <div className="half"></div>
          <div className="full"></div>
          <div className="full"></div>
          <div className="full"></div>
        </div>
      </div>
      <div className="item">
        <div className="bounce"></div>
        <div className="left"></div>
        <div className="right">
          <div className="half"></div>
          <div className="full"></div>
          <div className="full"></div>
          <div className="full"></div>
        </div>
      </div>
    </div>
  );
};

export default ListSkeleton;
