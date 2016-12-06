const fs = require('fs')
const R = require("ramda")
const Ru = require("@panosoft/ramda-utils")

const input = fs.readFileSync("./input.txt", "utf8")

const nextLetter = R.cond([
  [R.equals("a"), R.always("b")],
  [R.equals("b"), R.always("c")],
  [R.equals("c"), R.always("d")],
  [R.equals("d"), R.always("e")],
  [R.equals("e"), R.always("f")],
  [R.equals("f"), R.always("g")],
  [R.equals("g"), R.always("h")],
  [R.equals("h"), R.always("i")],
  [R.equals("i"), R.always("j")],
  [R.equals("j"), R.always("k")],
  [R.equals("k"), R.always("l")],
  [R.equals("l"), R.always("m")],
  [R.equals("m"), R.always("n")],
  [R.equals("n"), R.always("o")],
  [R.equals("o"), R.always("p")],
  [R.equals("p"), R.always("q")],
  [R.equals("q"), R.always("r")],
  [R.equals("r"), R.always("s")],
  [R.equals("s"), R.always("t")],
  [R.equals("t"), R.always("u")],
  [R.equals("u"), R.always("v")],
  [R.equals("v"), R.always("w")],
  [R.equals("w"), R.always("x")],
  [R.equals("x"), R.always("y")],
  [R.equals("y"), R.always("z")],
  [R.equals("z"), R.always("a")],
])

const parse = s => {
  const arr = R.split("-", s)
  const last = R.last(arr)
  const sectorId = R.take(3, last)
  const checksum = R.pipe(R.drop(4), R.init)(last)
  return {
    encryptedName: R.init(arr),
    sectorId: parseInt(sectorId, 10),
    checksum,
  }
}

const mostUsedLetters = R.pipe(
  R.map(R.split("")),
  R.flatten,
  R.countBy(R.identity),
  R.toPairs,
  R.map(p => ({ letter: R.head(p), count: R.last(p) })),
  R.sort(Ru.compareProps(["-count", "+letter"])),
  R.map(R.prop("letter")),
  R.take(5)
)

const determineIfReal = ({ encryptedName, sectorId, checksum }) => ({
  encryptedName,
  sectorId,
  checksum,
  isReal: R.join("", mostUsedLetters(encryptedName)) === checksum,
})

const decryptName = ({ encryptedName, checksum, sectorId }) => {
  const decrypted = R.pipe(
    R.map(
      R.map(
        R.reduce(nextLetter, R.__, R.range(0, sectorId))
      )
    ),
    R.map(R.join(""))
  )(encryptedName)
  return {
    encryptedName,
    checksum,
    sectorId,
    decryptedName: R.join(" ", decrypted),
  }
}

const sectorSumPipeline = R.pipe(
  R.split("\n"),
  R.map(parse),
  R.map(determineIfReal),
  R.filter(R.prop("isReal")),
  R.map(R.prop("sectorId")),
  R.sum
)

const decryptNamePipeline = R.pipe(
  R.split("\n"),
  R.map(parse),
  R.map(determineIfReal),
  R.filter(R.prop("isReal")),
  R.map(decryptName),
  R.find(R.where({ decryptedName: R.contains("northpole") })),
  R.prop("sectorId")
)

const sectorSumOutput = sectorSumPipeline(input)
const decryptedOutput = decryptNamePipeline(input)

console.log(`Sum of sector IDs of the real rooms: ${sectorSumOutput}`)
console.log(`Sector ID where North Pole objects are stored: ${decryptedOutput}`)
