import { Suspense } from "react";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import "./list.scss";

import Map from "../../components/map/Map";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";
import ListSkeleton from "../../components/Skeletons/ListSkeleton/ListSkeleton";
import { Await, useLoaderData } from "react-router-dom";

const List = () => {
  const data = useLoaderData();

  return (
    <div className="list">
      <div className="list-container">
        <Filter />
        <Suspense fallback={<ListSkeleton />}>
          <Await
            resolve={data.postResponse}
            errorElement={
              <div className="flex-wrapper">
                <p>Error loading posts!</p>
              </div>
            }
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
        <Suspense
          fallback={
            <div className="flex-wrapper">
              <SpinnerLoader />
            </div>
          }
        >
          <Await
            resolve={data.postResponse}
            errorElement={
              <div className="flex-wrapper">
                <p>Error loading Map!</p>
              </div>
            }
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default List;
