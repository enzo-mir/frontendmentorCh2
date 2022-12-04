const radioChoice = document.querySelectorAll("#choice input");
const labelChoice = document.querySelectorAll("#choice label");
const changeDuration = document.getElementById("changeDuration");

radioChoice.forEach((inputs) => {
  inputs.addEventListener("change", (e) => {
    labelChoice.forEach((labels) => {
      labels.getAttribute("for") == inputs.getAttribute("id")
        ? labels.classList.add("toggle")
        : labels.removeAttribute("class");
    });
  });
});

const checkboxDuration = document.querySelector("#checkPlan input");
const h2DurationMonth = document.querySelectorAll(
  "#durationPlan h2:nth-child(1)"
);
const h2DurationYear = document.querySelectorAll(
  "#durationPlan h2:nth-child(3)"
);

const h2Duration = document.querySelectorAll("#durationPlan h2");
const pDurationFreeMonths = document.querySelectorAll("#choice p:nth-child(4)");
const pDurationNewPrice = document.querySelectorAll("#choice p:nth-child(3)");
const h3CostAddOns = document.querySelectorAll("#PickAddOns .card label h3");

var pricesObject = {
  month: [9, 12, 15],
  year: [90, 120, 150],
};

function changePlanDuration(elem, type, abr) {
  for (let index = 0; index < elem.length; index++) {
    for (let i = 0; i < type.length; i++) {
      const element = type[i];
      elem[i].textContent = `$${element}/${abr}`;
    }
  }
}

checkboxDuration.addEventListener("change", (e) => {
  h2Duration.forEach((h2) => {
    if (h2.getAttribute("data-select") == "true") {
      h2.setAttribute("data-select", "false");

      changePlanDuration(pDurationNewPrice, pricesObject.month, "mo");
      changePlanDuration(h3CostAddOns, pricesObject.month, "mo");

      pDurationFreeMonths.forEach((element) => {
        element.style.opacity = "0";
      });
    } else {
      h2.setAttribute("data-select", "true");

      changePlanDuration(pDurationNewPrice, pricesObject.year, "yr");
      changePlanDuration(h3CostAddOns, pricesObject.year, "yr");

      pDurationFreeMonths.forEach((element) => {
        element.style.opacity = "1";
      });
    }
  });
});

const addOnsCheckbox = document.querySelectorAll(
  "#PickAddOns .card label input"
);
const addOnsAccess = document.querySelectorAll("#PickAddOns .card");

addOnsCheckbox.forEach((checkbox) => {
  const parentStyle = checkbox.parentElement.parentNode.style;
  checkbox.onchange = () => {
    if (checkbox.checked) {
      parentStyle.backgroundColor = "hsla(228, 100%, 84%, 0.1)";
      parentStyle.border = "1px solid hsl(213, 96%, 18%)";
    } else {
      parentStyle.backgroundColor = "white";
      parentStyle.border = "1px solid rgba(185, 197, 255, 0.3)";
    }
  };
});

const nextbutton = document.getElementById("next");
const prevbutton = document.getElementById("prev");
const allButtons = document.querySelectorAll("button");
const linkNav = document.querySelectorAll("li a");
const allSections = document.querySelectorAll("section");


let loop = 0;
var tableLink = [],
  tableSections = [];

function pushTable(elem, table) {
  elem.forEach((e) => {
    table.push(e);
  });
}

pushTable(linkNav, tableLink);
pushTable(allSections, tableSections);
prevBtnOpacity();
nextBtnOpacity();

function prevBtnOpacity() {
  if (loop < 1) {
    prevbutton.style.opacity = "0";
    prevbutton.style.pointerEvents = "none";
  } else {
    prevbutton.style.opacity = "1";
    prevbutton.style.pointerEvents = "auto";
  }
}

function nextBtnOpacity() {
  if (loop == 4) {
    nextbutton.style.opacity = "0";
    nextbutton.style.pointerEvents = "none";
  } else {
    nextbutton.style.opacity = "1";
    nextbutton.style.pointerEvents = "auto";
  }
}

function setPlan() {
  data.splice(0, 2);
  if (loop < 3 && loop > 1) {
    radioChoice.forEach((element) => {
      element.checked ? data.push(element.getAttribute("id")) : null;
    });
    if (checkboxDuration.checked) data.push("month");
    else data.push("year");
  }
}

function setPickOns() {
  if (loop == 2) {
    data.length > 2 ? data.splice(2, 6) : null;
  }
  if (loop == 3) {
    addOnsCheckbox.forEach((addOns) => {
      if (addOns.checked) {
        data.push(
          addOns.parentElement.children[1].firstChild.nextSibling.innerText
        );
        data.push(addOns.parentElement.children[2].innerText);
      }
    });
  }
}
const componentDiv = document.getElementById("components");

const nameComponentsAddOns = componentDiv.querySelector(
  ".addOnsResult>aside:first-child"
);

nextbutton.onclick = nextBtnClick;

function nextBtnClick() {
  if (loop < 4) {
    loop++;
  }

  tableSections[loop].setAttribute("data-active", "true");
  tableSections[loop - 1].setAttribute("data-active", "false");

  if (loop <= 3) {
    tableLink[loop].setAttribute("data-target", "true");
    tableLink[loop - 1].setAttribute("data-target", "false");
  }

  loop < 3 ? (nextbutton.innerHTML = "Next Step") : null;
  if (loop == 3) nextbutton.innerHTML = "Confirm";

  if (loop == 2) setPlan();
  if (loop == 3) setPickOns();

  prevBtnOpacity();
  nextBtnOpacity();
  textComponents();
}

prevbutton.onclick = prevBtnClick;

function prevBtnClick() {
  if (loop > 0) loop--;

  tableLink[loop].setAttribute("data-target", "true");

  if (loop <= 3) {
    tableSections[loop].setAttribute("data-active", "true");
    tableSections[loop + 1].setAttribute("data-active", "false");
  }

  if (loop < 3) {
    data.splice(2, 6);
    setTimeout(() => {
      nameComponentsAddOns.innerHTML = "";
    }, 200);
  }

  if (loop < 3) {
    tableLink[loop + 1].setAttribute("data-target", "false");
  }

  loop < 3 ? (nextbutton.innerHTML = "Next Step") : null;
  loop >= 3 ? (nextbutton.innerHTML = "Confirm") : null;

  if (loop == 1) setPlan();
  prevBtnOpacity();
  nextBtnOpacity();
}

/* RESULT PART */

const resultContainer = document.querySelector(".c4");
const Presult = document.querySelector("#result p");
const finalCost = document.querySelector("#result h2");

const H2ComponentsDivPlan = componentDiv.querySelector(".planResult>aside h2");
const PComponentsDivPlan = componentDiv.querySelector(".planResult>aside p");

let data = [];

function intExtractor(str) {
  var matches = str.match(/(\d+)/);
  if (matches) return parseInt(matches[0]);
  else {
    return str;
  }
}

function textComponents() {
  var planChoosen = document.querySelector(".toggle h2").innerHTML;
  var durationCall = data[1] == "year" ? "Yearly" : "Monthly";
  var durationCallabr = data[1] == "year" ? "yr" : "mo";

  var planCost = intExtractor(document.querySelector(".toggle p").innerHTML);
  let picksValue = [];
  let tableResult = [];
  addOnsCheckbox.forEach((picks) => {
    if (picks.checked) {
      picksValue.push(
        picks.parentElement.children[1].firstChild.nextSibling.innerText
      );
      picksValue.push(picks.parentElement.children[2].innerText);
    }
  });
  if (loop == 3) {
    H2ComponentsDivPlan.textContent = `${planChoosen} (${durationCall})`;
    PComponentsDivPlan.textContent = `$${planCost}/${durationCallabr}`;

    changeDuration.onclick = changePlan;

    function changePlan() {
      loop = 1;
      nextbutton.onclick = nextBtnClick;
      setTimeout(() => {
        nameComponentsAddOns.innerHTML = "";
      }, 200);
      data = [];
      for (let index = 0; index < allSections.length; index++) {
        const element = allSections[index];
        allSections[1].setAttribute("data-active", "true");
        element.setAttribute("data-active", "false");
      }
    }

    if (loop < 4) {
      if (data.length > 2) {
        for (let i = 2; i < data.length; i++) {
          var element = intExtractor(data[i]);
          let para = nameComponentsAddOns.appendChild(
            document.createElement("p")
          );
          typeof element == "number"
            ? (para.innerHTML = `+$${element}/${durationCallabr}`)
            : (para.innerHTML = element);
        }
      }
    }
    const costComponentsAddOns = document.querySelectorAll(
      "#components .addOnsResult aside p:nth-child(even)"
    );

    Presult.innerText = `Total (per ${data[1]})`;
    tableResult.push(planCost);

    costComponentsAddOns.forEach((elem) => {
      var AddOnsCostInt = elem.innerHTML.match(/(\d+)/);
      if (AddOnsCostInt) {
        tableResult.push(AddOnsCostInt[0]);
      }
    });
    finalCost.innerHTML = `+$${eval(tableResult.join("+"))}/${durationCallabr}`;
  }
}
