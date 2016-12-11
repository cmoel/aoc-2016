const fs = require("fs")
const R = require("ramda")

const input = fs.readFileSync("./input.txt", "utf8")

const sort = arr => {
  return R.sort(
    (x, y) => {
      const eqX = R.filter(R.equals(x))
      const eqY = R.filter(R.equals(y))
      return R.length(eqX(arr)) - R.length(eqY(arr))
    },
    arr
  )
}

const pipeline = R.pipe(
  R.split("\n"),
  R.transpose,
  R.map(sort),
  R.map(R.head), // or R.map(R.last) if getting the most used letter
  R.join(""),
  R.identity
)

const output = pipeline(input)

console.log("The message is:", output)
