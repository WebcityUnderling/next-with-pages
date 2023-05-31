import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

import fido from "@/utils/fido";
import Spinner from "@/components/global/Spinner";
import styles from "@/styles/components/careerslist.module.css";

export default function CareersList() {
  // Data
  const [careers, setCareers] = useState([]);
  const [positionsPage, setPositionsPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // store operations
  const storedPositions = useSelector((state) => state.careers.positions);
  const storedTotalPositions = useSelector(
    (state) => state.careers.totalPositions
  );
  const dispatch = useDispatch();

  // init
  useEffect(() => {
    const initPositions = async () => {
      if (!storedPositions.length && !storedTotalPositions) {
        const { data } = await fido.get(
          "https://api.savage.si/employment/positions?limit=6"
        );
        dispatch({ type: "careers/setInitialPositions", payload: data.data });
        dispatch({ type: "careers/setTotalPositions", payload: data.total });
        setCareers([...storedPositions]);
      } else {
        setCareers([...storedPositions]);
      }
    };

    initPositions();

    return () => {};
  }, [storedPositions, storedTotalPositions, setCareers]);


  const loadMorePositions = async () => {
    setLoadingMore(true);
    const { data } = await fido.get(
      `https://api.savage.si/employment/positions?limit=6&page=${
        positionsPage + 1
      }`
    );
    setPositionsPage(positionsPage + 1);
    setCareers([...[...careers, ...data.data]]);
    setLoadingMore(false);
  };

  return (
    <>
      {careers.length ? (
        <>
          <div className={styles["careers-list"]}>
            {careers.map((position, index) => {
              return (
                <Link
                  key={index}
                  href={`/careers/${position.slug}`}
                  className={`${styles["careers-list__item"]} ${
                    styles[
                      `careers-list__item--${position.category.toLowerCase()}`
                    ]
                  }`}
                >
                  <span>{position.category}</span>
                  {position.title}
                </Link>
              );
            })}
          </div>
          <div className="careers-list__actions">
            {(careers.length != storedTotalPositions) && (
              <button onClick={loadMorePositions} className="btn">
                {loadingMore ? 'Loading' : 'Load More'}
              </button>
            )}
            {/* {positionsPage} */}
          </div>
        </>
      ) : (
        <LoadingSkeleton />
      )}
    </>
  );
}

const LoadingSkeleton = () => (
  <div
    className={`${styles["careers-list"]} ${styles["careers-list--loading"]}`}
  >
    <div className={styles["careers-list__spinner"]}>
      <Spinner />
    </div>
    <div className={styles["careers-list__item"]}></div>
    <div className={styles["careers-list__item"]}></div>
    <div className={styles["careers-list__item"]}></div>
    <div className={styles["careers-list__item"]}></div>
    <div className={styles["careers-list__item"]}></div>
    <div className={styles["careers-list__item"]}></div>
  </div>
);
