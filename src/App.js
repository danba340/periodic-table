import React from "react";
import Element from "./components/Element";
import useFetch from "react-fetch-hook";

// Blank spots in table
const blanks = [
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  127,
  128,
  129,
  130,
  131,
  132,
  133,
  134,
  135,
  136,
  137,
  138,
  139,
  140,
  141,
  142,
  143,
  144,
  145,
  146,
  147,
  163,
  164,
  165,
];

const backgrounds = [
  "linear-gradient(135deg, #ce9ffc 10%, #7367f0 100%)",
  "linear-gradient( 135deg, #FCCF31 10%, #F55555 100%)",
  "linear-gradient( 135deg, #90F7EC 10%, #32CCBC 100%)",
  "linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%)",
  "linear-gradient( 135deg, #F761A1 10%, #8C1BAB 100%)",
  "linear-gradient( 135deg, #FFF720 10%, #3CD500 100%)",
  "linear-gradient( 135deg, #FEC163 10%, #DE4313 100%)",
  "linear-gradient( 135deg, #FDEB71 10%, #F8D800 100%)",
  "linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%)",
  "linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%)",
  "linear-gradient( 135deg, #97ABFF 10%, #123597 100%)",
];
const shuffledBackgrounds = shuffleArray(backgrounds);

// Init table datastore
const periodicTable = new Array(181).fill(null);
periodicTable[92] = "*";
periodicTable[110] = "**";
periodicTable[146] = "*";
periodicTable[164] = "**";

// const getElementByAtomNr = (elements, nr) => {
//   const element = elements.find((element) => {
//     return element.atomicNumber === nr;
//   });
//   return element || null;
// };

const getGroups = (elements) => {
  const groups = [];
  elements.forEach((element) => {
    if (!groups.includes(element.groupBlock)) {
      groups.push(element.groupBlock);
    }
  });
  return groups;
};

function shuffleArray(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function App() {
  //console.log([...periodicTable]);
  const { isLoading, data } = useFetch(
    "https://neelpatel05.pythonanywhere.com"
  );
  if (isLoading) return "Loading...";
  const groups = getGroups(data);
  const groupToBackground = {};
  groups.forEach((group, index) => {
    groupToBackground[group] = shuffledBackgrounds[index];
  });

  // Put elements into correct spots in table
  data.forEach((element) => {
    let spotSearchIndex = element.atomicNumber;
    if (element.atomicNumber >= 57 && element.atomicNumber <= 71) {
      spotSearchIndex = 147;
    } else if (element.atomicNumber >= 89 && element.atomicNumber <= 103) {
      spotSearchIndex = 165;
    }
    while (
      (blanks.includes(spotSearchIndex) ||
        periodicTable[spotSearchIndex - 1]) &&
      spotSearchIndex < periodicTable.length
    ) {
      spotSearchIndex++;
    }

    periodicTable[spotSearchIndex - 1] = element;
  });
  periodicTable[periodicTable.length - 1] = null;

  return (
    <div className="App">
      <h1>Dirty Periodic Table</h1>
      <div className="flex items-center justify-center flex-wrap pa5">
        {periodicTable.map((element, index) => {
          //console.log(element);
          if (element) {
            if (element.atomicNumber) {
              return (
                <Element
                  key={index}
                  number={element.atomicNumber}
                  name={element.symbol}
                  background={groupToBackground[element.groupBlock]}
                />
              );
            } else {
              return <Element key={index} number=" " name={element} blank />;
            }
          } else {
            return <Element key={index} number="" name="" blank />;
          }
        })}
      </div>
    </div>
  );
}

export default App;
