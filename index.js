function setrootincss(variable, value) {
  for (let i = 0; i < variable.length; i++) {
    document.documentElement.style.setProperty(`${variable[i]}`, `${value[i]}`);
  }
}
let count = true;
let number = "";
let valueofnext = "";
let currentbtnclicked = "";
let decimalsignal = true;
let lastlength = 0;
const resultsection = document.querySelector(".result-section");
window.addEventListener("click", (e) => {
  const targetElement = e.target;
  const modebtn = document.querySelector(".mode-btn");
  const circle = document.querySelector(".circle");
  const i = document.querySelector(".fa-regular fa-sun");
  if (
    targetElement.className == "mode-btn" ||
    targetElement.className == "circle" ||
    targetElement.className == "circle effect" ||
    targetElement.className == "fa-regular fa-sun"
  ) {
    const Properties = [
      "--white-color",
      "--black-color",
      "--dark-white-color",
      "--top-oparation-bg-color",
      "--btn-bg-color",
      "--section4-bg-color",
      "--upper-color",
    ];
    if (circle.className == "circle effect") {
      circle.classList.toggle("effect");
      //   document.documentElement.style.setProperty("","");
      const value = [
        "black",
        "white",
        "black",
        "rgb(225, 193, 110)",
        "rgb(210, 125, 45)",
        "rgb(240, 230, 140)",
        "rgb(204, 119, 34)",
      ];
      setTimeout(() => {
        setrootincss(Properties, value);
      }, 50);
    } else {
      circle.classList.toggle("effect");
      const value = [
        "white",
        "black",
        "rgb(209, 203, 203)",
        "rgb(127, 104, 75)",
        "rgb(105, 63, 39)",
        "rgb(38, 40, 44)",
        "rgb(34, 35, 37)",
      ];
      setTimeout(() => {
        setrootincss(Properties, value);
      }, 50);
    }
  }
  if (
    targetElement.id == "expand" ||
    targetElement.className == "fa-solid fa-up-right-and-down-left-from-center"
  ) {
    const wrapper = document.querySelector(".wrapper");
    wrapper.classList.toggle("wrapper-expand");
  }
});
const csym = document.querySelector(".csym");
const equal = document.querySelector(".equal");
const operations = document.querySelectorAll(".operation");
const numbers = document.querySelectorAll(".num");
const deletebtn = document.querySelector("#delete");
class datas {
  constructor() {
    this.val = "";
    this.opa = "";
    this.val2 = "";
    this.currentsituation = false;
    this.countaddsection = true;
    this.countresultsection = true;
    this.countdecimal = true;
    this.countzero = true;
    this.operationsituation = "";
  }
  displayabove(element, opaacc) {
    if (this.val.length <= 15 && this.val2.length <= 15) {
      const addnumbersection = document.querySelector(".add-number-section");
      if (this.countaddsection) {
        addnumbersection.innerText = "";
        this.countaddsection = false;
      }
      addnumbersection.appendChild(document.createTextNode(`${element}`));
      this.operationsituation = opaacc;
      if (this.operationsituation) {
        this.opa += element;
        this.currentsituation = true;
        this.countdecimal = true;
      } else if (this.currentsituation) {
        this.val2 += element;
      } else {
        this.val += element;
      }
    } else {
      console.log(this.val.length);
      alert("can't enter more then 15 digits!");
      this.delete();
    }
  }
  delete() {
    const addnumbersection = document.querySelector(".add-number-section");
    if (this.val != "" && this.opa == "") {
      let afterdelnum = this.val.slice(0, -1);
      if (afterdelnum == "") {
        afterdelnum = 0;
      }
      this.val = afterdelnum;
      console.log(afterdelnum);
      addnumbersection.innerHTML = "";
      addnumbersection.appendChild(document.createTextNode(`${afterdelnum}`));
    }
    if (this.val2 == "" && this.opa != "") {
      this.opa = "";
      this.operationsituation = "";
      this.currentsituation = false;
      addnumbersection.innerHTML = addnumbersection.innerText.slice(0, -1);
    }
    if (this.val2 != "" && this.opa != "") {
      let afterdelnum = this.val2.slice(0, -1);
      this.val2 = afterdelnum;
      console.log(afterdelnum);
      addnumbersection.innerHTML = addnumbersection.innerText.slice(0, -1);
    }
  }
  reset() {
    const addnumbersection = document.querySelector(".add-number-section");
    const resultsection = document.querySelector(".result-section");
    addnumbersection.innerText = `0`;
    resultsection.innerText = `0`;
    this.val = "";
    this.opa = "";
    this.val2 = "";
    this.currentsituation = false;
    this.countaddsection = true;
    this.countresultsection = true;
    this.countdecimal = true;
    this.countzero = true;
  }
  displaybelow() {
    const resultsection = document.querySelector(".result-section");
    if (this.countresultsection) {
      resultsection.innerText = "";
      this.countresultsection = false;
    }
    if (this.val != "" && this.val2 != "") {
      switch (this.opa) {
        case "+":
          resultsection.innerHTML = `${Number(this.val) + Number(this.val2)}`;
          break;
        case "x":
          resultsection.innerHTML = `${Number(this.val) * Number(this.val2)}`;
          break;
        case "/":
          resultsection.innerHTML = `${Number(this.val) / Number(this.val2)}`;
          break;
        case "-":
          resultsection.innerHTML = `${Number(this.val) - Number(this.val2)}`;
          break;
        case "%":
          resultsection.innerHTML = `${Number(this.val) % Number(this.val2)}`;
          break;
        default:
          console.log("something Went Wrong");
      }
    } else {
      resultsection.innerHTML = "SyntaxError";
    }
  }
}
const data = new datas();
csym.addEventListener("click", () => {
  data.reset();
});
operations.forEach((e) => {
  e.addEventListener("click", () => {
    if (!data.currentsituation) {
      data.displayabove(e.id, true);
    }
  });
});
numbers.forEach((e) => {
  e.addEventListener("click", () => {
    if (e.className.includes("decimal")) {
      if (data.countdecimal) {
        if (data.val == "") {
          data.countaddsection = false;
          data.displayabove(".");
          data.countdecimal = false;
        } else if (
          data.val != "" &&
          data.val2 == "" &&
          data.operationsituation
        ) {
          data.displayabove("0.");
          data.countdecimal = false;
        } else {
          data.displayabove(".");
          data.countdecimal = false;
        }
      }
    } else if (e.id == "0") {
      if (data.val == "") {
        data.countaddsection = false;
        data.countzero = false;
      } else if (data.val != "" && data.val2 == "") {
        data.displayabove(e.id);
        data.countzero = false;
      } else {
        if (data.countzero) data.displayabove(e.id);
      }
    } else {
      data.displayabove(e.id);
      data.countzero = true;
    }
  });
});
equal.addEventListener("click", () => {
  data.displaybelow();
});
deletebtn.addEventListener("click", () => {
  data.delete();
});
