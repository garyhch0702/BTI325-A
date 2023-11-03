/********************************************************************************
* BTI325 – Assignment 04
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: _________CHENGHAO HU_____________ Student ID: _____149773228_________ Date: _________2023/11/3_____
*
********************************************************************************/
const legoData = require("./modules/legoSets");
const express = require("express");
const app = express();
const path = require("path");

const { initialize, getAllSets, getSetByNum, getSetsByTheme } = legoData;

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/lego/sets", (req, res) => {
  const theme = req.query.theme;
  if (theme) {
    getSetsByTheme(theme)
      .then((data) => res.render("sets", { sets: data }))
      .catch((err) => res.status(404).render("404"));
  } else {
    getAllSets()
      .then((data) => res.render("sets", { sets: data }))
      .catch((err) => res.status(404).render("404"));
  }
});


app.get("/lego/sets/:setNum", (req, res) => {
  const num = req.params.setNum;

  getSetByNum(num)
    .then((data) => res.render("set", { set: data }))
    .catch((err) => res.status(404).render("404"));
});

app.use((req, res) => {
  res.status(404).render("404");
});

initialize()
  .then(() => {
    app.listen(8080, () => console.log("App is running on the port 8080."));
  })
  .catch((err) => console.log(err));