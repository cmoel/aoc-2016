const R = require("ramda")

// Instruction = { turn: "R" | "L", steps: Number }
// Facing = N | E | S | W
// Model = { n: Number, e: Number, s: Number, w: Number, facing: Facing }
// HistoryEntry = { x: Number, y: Number }
// Result = { blocks: Number, firstPassed: HistoryEntry }

// const input = "R4"
// const input = "R4, R3, L3, L2"
// const input = "R8, R4, R4, R8"
const input = "R4, R3, L3, L2, L1, R1, L1, R2, R3, L5, L5, R4, L4, R2, R4, L3, R3, L3, R3, R4, R2, L1, R2, L3, L2, L1, R3, R5, L1, L4, R2, L4, R3, R1, R2, L5, R2, L189, R5, L5, R52, R3, L1, R4, R5, R1, R4, L1, L3, R2, L2, L3, R4, R3, L2, L5, R4, R5, L2, R2, L1, L3, R3, L4, R4, R5, L1, L1, R3, L5, L2, R76, R2, R2, L1, L3, R189, L3, L4, L1, L3, R5, R4, L1, R1, L1, L1, R2, L4, R2, L5, L5, L5, R2, L4, L5, R4, R4, R5, L5, R3, L1, L3, L1, L1, L3, L4, R5, L3, R5, R3, R3, L5, L5, R3, R4, L3, R3, R1, R3, R2, R2, L1, R1, L3, L3, L3, L1, R2, L1, R4, R4, L1, L1, R3, R3, R4, R1, L5, L2, R2, R3, R2, L3, R4, L5, R1, R4, R5, R4, L4, R1, L3, R1, R3, L2, L3, R1, L2, R3, L3, L1, L3, R4, L4, L5, R3, R5, R4, R1, L2, R3, R5, L5, L4, L1, L1"

const N = "N"
const E = "E"
const S = "S"
const W = "W"

// History
const initialHistory = [{ x: 0, y: 0 }]

// Model
const initialModel = { N: 0, E: 0, S: 0, W: 0, facing: N, history: initialHistory }

// String -> Instruction
const convertToInstruction = str => ({ turn: R.head(str), steps: parseInt(R.tail(str), 10) })

// Facing -> Facing
const turnRight = R.cond([
  [R.equals(N), R.always(E)],
  [R.equals(E), R.always(S)],
  [R.equals(S), R.always(W)],
  [R.equals(W), R.always(N)],
])

// Facing -> Facing
const turnLeft = R.cond([
  [R.equals(N), R.always(W)],
  [R.equals(W), R.always(S)],
  [R.equals(S), R.always(E)],
  [R.equals(E), R.always(N)],
])

// Model -> Turn -> Facing
const calculateDirection = (model, turn) =>
  R.equals(turn, "R")
    ? turnRight(model.facing)
    : turnLeft(model.facing)

// History -> Turn -> Number -> History
const recordHistory = (history, dir, steps) => {
  const northOrEast = R.either(R.equals(N), R.equals(E))
  const operation = n => northOrEast(dir) ? R.add(n) : R.subtract(R.__, n)

  const lastEntry = R.last(history)
  const transformations = n => ({
    x: dir === E || dir === W ? operation(n) : R.identity,
    y: dir === N || dir === S ? operation(n) : R.identity,
  })
  const historyForSteps = R.times(s => R.evolve(transformations(R.inc(s)), lastEntry), steps)

  return R.concat(history, historyForSteps)
}

// Model -> Instruction -> Model
const walk = (model, instruction) => {
  const dir = calculateDirection(model, instruction.turn)
  const steps = instruction.steps
  const transformations = {
    N: dir === N ? R.add(steps) : R.identity,
    E: dir === E ? R.add(steps) : R.identity,
    S: dir === S ? R.add(steps) : R.identity,
    W: dir === W ? R.add(steps) : R.identity,
    facing: R.always(dir),
    history: R.always(recordHistory(model.history, dir, steps)),
  }
  return R.evolve(transformations, model)
}

// Model -> Number
const calculateBlocks = ({ N, S, E, W }) => (Math.abs(N - S) + Math.abs(E - W))

// History -> HistoryEntry
const findFirstRepass = history => {
  const indexedDropper = R.addIndex(R.dropWhile)
  const found = indexedDropper((histEntry, i) => {
    const historyAfterV = R.drop(R.inc(i), history)
    const maybeFound = R.find(R.equals(histEntry), historyAfterV)
    return R.isNil(maybeFound)
  }, history)

  return R.head(found)
}

// Model -> Result
const buildResult = model => {
  const firstRepass = findFirstRepass(model.history)
  return {
    totalBlocks: calculateBlocks(model),
    firstRepass: firstRepass,
    firstRepassBlocks: Math.abs(firstRepass.x) + Math.abs(firstRepass.y),
  }
}

const pipeline = R.pipe(
  R.split(", "),
  R.map(convertToInstruction),
  R.reduce((model, i) => walk(model, i), initialModel),
  buildResult
)

const output = pipeline(input)

console.log(output)
