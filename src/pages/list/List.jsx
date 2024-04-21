import { Suspense } from "react";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import "./list.scss";

import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";

const List = () => {
  const data = useLoaderData();

  return (
    <div className="list">
      <div className="list-container">
        <Filter />
        <Suspense fallback={<p>Loading ...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) =>
              postResponse.data.map((post) => (
                <Card key={post.id} card={post} />
              ))
            }
          </Await>
        </Suspense>
      </div>
      <div className="map-container">
        <Suspense fallback={<p>Loading ...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default List;
