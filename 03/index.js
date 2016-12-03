const fs = require('fs')
const R = require("ramda")

const input = fs.readFileSync("./input.txt", "utf8")

const buildObj = arr => ({
  s: arr[0],
  m: arr[1],
  l: arr[2],
  isRealTriangle: (arr[0] + arr[1]) > arr[2],
})

const stripExtraWhitespace = R.pipe(R.replace(/\s+/g, " "), R.trim)

const prepInput = R.pipe(
  R.split("\n"),
  R.map(stripExtraWhitespace),
  R.reject(R.isEmpty)
)

const calculatePossibilities = R.pipe(
  R.filter(R.propEq("isRealTriangle", true)),
  R.length
)

const groupColObjs = arrOfArrs => ([
  [
    arrOfArrs[0][0],
    arrOfArrs[1][0],
    arrOfArrs[2][0],
  ],
  [
    arrOfArrs[0][1],
    arrOfArrs[1][1],
    arrOfArrs[2][1],
  ],
  [
    arrOfArrs[0][2],
    arrOfArrs[1][2],
    arrOfArrs[2][2],
  ],
])

const rowPipeline = R.pipe(
  prepInput,
  R.map(R.split(" ")),
  R.map(R.map(str => parseInt(str, 10))),
  R.map(R.sort((x, y) => x > y)),
  R.map(buildObj),
  calculatePossibilities
)

const colPipeline = R.pipe(
  prepInput,
  R.splitEvery(3),
  R.map(R.map(R.split(" "))),
  R.map(groupColObjs),
  R.map(R.map(R.map(str => parseInt(str, 10)))),
  R.map(R.map(R.sort((x, y) => x > y))),
  R.map(R.map(buildObj)),
  R.flatten,
  calculatePossibilities
)

const rowOutput = rowPipeline(input)
const colOutput = colPipeline(input)

console.log("rowOutput:", rowOutput)
console.log("colOutput:", colOutput)
