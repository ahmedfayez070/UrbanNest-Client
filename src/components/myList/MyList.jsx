import "./myList.scss";
import Card from "../card/Card";

const MyList = ({ posts }) => {
  return (
    <div className="my-list">
      {posts.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default MyList;
