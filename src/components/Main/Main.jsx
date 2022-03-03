import styles from "./Main.module.css";
import { HomePage, NewsItem } from "..";
import { api } from "../../utils/api";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

const Main = () => {
  const [newsArray, setNewsArray] = useState([]);

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate() < 10 ? "0" + a.getDate() : a.getDate();
    var hour = a.getHours() < 10 ? "0" + a.getHours() : a.getHours();
    var min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? "0" + a.getSeconds() : a.getSeconds();
    var time = `${date} ${month} ${year} ${hour}:${min}:${sec}`;
    return time;
  }

  useEffect(() => {
    console.log();
    api
      .getNews()
      .then((res) => {
        res.slice(0, 100).forEach((item) => {
          return api
            .getItemById(item)
            .then((res) => {
              setNewsArray((n) => [...n, res]);
            })
            .catch((e) => {
              console.log(e);
            });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <main className={styles.content}>
      <Routes>
        <Route
          exact
          path="/liza-alert-test"
          element={
            <HomePage cardsList={newsArray} timeConverter={timeConverter} />
          }
        />
        <Route
          exact
          path="/liza-alert-test/:id"
          element={
            <NewsItem newsList={newsArray} timeConverter={timeConverter} />
          }
        />
      </Routes>
    </main>
  );
};

export default Main;
