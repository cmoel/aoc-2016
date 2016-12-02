const R = require("ramda")

const input = "R4, R3, L3, L2, L1, R1, L1, R2, R3, L5, L5, R4, L4, R2, R4, L3, R3, L3, R3, R4, R2, L1, R2, L3, L2, L1, R3, R5, L1, L4, R2, L4, R3, R1, R2, L5, R2, L189, R5, L5, R52, R3, L1, R4, R5, R1, R4, L1, L3, R2, L2, L3, R4, R3, L2, L5, R4, R5, L2, R2, L1, L3, R3, L4, R4, R5, L1, L1, R3, L5, L2, R76, R2, R2, L1, L3, R189, L3, L4, L1, L3, R5, R4, L1, R1, L1, L1, R2, L4, R2, L5, L5, L5, R2, L4, L5, R4, R4, R5, L5, R3, L1, L3, L1, L1, L3, L4, R5, L3, R5, R3, R3, L5, L5, R3, R4, L3, R3, R1, R3, R2, R2, L1, R1, L3, L3, L3, L1, R2, L1, R4, R4, L1, L1, R3, R3, R4, R1, L5, L2, R2, R3, R2, L3, R4, L5, R1, R4, R5, R4, L4, R1, L3, R1, R3, L2, L3, R1, L2, R3, L3, L1, L3, R4, L4, L5, R3, R5, R4, R1, L2, R3, R5, L5, L4, L1, L1"

const N = "N"
const E = "E"
const S = "S"
const W = "W"

// Instruction = { turn: "R" | "L", steps: Number }
// Facing = N | E | S | W
// Model = { n: Number, e: Number, s: Number, w: Number, facing: Facing }

// Model
const start = { N: 0, E: 0, S: 0, W: 0, facing: N }

// String -> [String]
const split = R.split(", ")

// String -> Instruction
const convertToInstruction = str => ({ turn: R.head(str), steps: parseInt(R.tail(str), 10) })

// Facing -> Facing
const turnRight = facing => {
  switch (facing) {
    case N: return E
    case E: return S
    case S: return W
    case W: return N
  }
}

// Facing -> Facing
const turnLeft = facing => {
  switch (facing) {
    case N: return W
    case W: return S
    case S: return E
    case E: return N
  }
}

// Model -> Turn -> Facing
const calculateDirection = (model, turn) =>
  turn === "R"
  ? turnRight(model.facing)
  : turnLeft(model.facing)

// Model -> Instruction -> Model
const move = (model, instruction) => {
  const dir = calculateDirection(model, instruction.turn)
  const steps = instruction.steps
  const transformations = {
    N: dir === N ? R.add(steps) : R.identity,
    E: dir === E ? R.add(steps) : R.identity,
    S: dir === S ? R.add(steps) : R.identity,
    W: dir === W ? R.add(steps) : R.identity,
    facing: () => dir,
  }
  return R.evolve(transformations, model)
}

const pipeline = R.pipe(
  split,
  R.map(convertToInstruction),
  R.reduce((model, i) => move(model, i), start),
  model => (Math.abs(model.N - model.S) + Math.abs(model.E - model.W))
)

const output = pipeline(input)

console.log(output)
