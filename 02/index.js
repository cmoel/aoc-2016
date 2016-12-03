const R = require("ramda")

const input =
`RRLLRLLRULLRUUUDRDLDDLLLDDDDDUUURRRRUUDLRULURRRDRUDRUUDDRUDLLLRLDDDUDRDDRRLLLLRLRLULUURDRURRUULDRRDUDURRUURURDLURULLDUDRDLUUUUDDURRLLLUDLDLRDRRRDULLDLDULLDRLDLDURDLRRULLDDLDRLLLUDDLLRDURULLDDDDDUURURLRLRRDUURUULRLLLULLRLULLUUDRRLLDURLDDDDULUUDLUDDDULRLDURDDRUUDRRUUURLLLULURUDRULDRDUDUDRRDDULRURLLRRLRRLLDLULURDRDRULDRDRURUDLLRRDUUULDDDUURDLULDLRLLURRURLLUDURDDRUDRDLLLLDLRLDLDDRDRRDUUULLUULRRDLURLDULLDLDUUUULLLDRURLRULLULRLULUURLLRDDRULDULRLDRRURLURUDLRRRLUDLDUULULLURLDDUDDLLUDRUDRLDUDURRRRLRUUURLUDDUDURDUDDDLLRLRDDURDRUUDUDRULURLRLDRULDRRLRLDDDRDDDRLDUDRLULDLUDLRLRRRLRDULDDLRRDDLDDULDLLDU
RULLUDDUDLULRRDLLDRUDLLLDURLLLURDURLRDRRDLRDRDLLURRULUULUDUDDLLRRULLURDRLDURDLDDUURLUURLDLDLRLDRLRUULDRLRLDRLRLUDULURDULLLDRUDULDURURRRUDURDUDLRDRRURULRRLRLRRRRRRDRUDLDRULDRUDLRDLRRUDULDLRLURRRLLDRULULRUDULRLULLRLULDRUDUULLRUULDULDUDDUUULLLDRDDRRDLURUUDRRLRRRDLRRLULLLLDLRUULDLLULURUURURDRURLLDUDRRURRURRUUDDRRDDRRRRUDULULRLUULRRDDRDDLLUDLDLULLRLDRLLUULDURLDRULDDUDRUUUURRLDDUDRUURUDLLDLDLURDLULDRLLLULLLUDLLDLD
RDLDULURDLULRRDLRLLLULRUULURULLLDLLDDRLLURUUUURDRLURLLRLRLLLULRDLURDURULULDDUDDUDRLRLDLULLURRRUULUDRDURRRUDDDLUDLDLRLRRLLLRUULLLLURRDDDRRRUURULRLDRRRLRLUDDRRULDDDRUUDDRLLDULRLUDUDLDLDDDUDDLLDDRDRDUDULDRRUDRDRRDRLUURDLRDDDULLDRRRRRUDRLURDUURRDDRLUDLURRRLRDDDLRRLUULRLURDUUURRDLDDULLLRURRRUDRLUDLLDDDDDUDDRDULLUUDDURRLULLUDULUUDRLDRRRLLURLRRLLDLLLLUDRUUUDDULLRDLLDUDUDUURRUUUDRUURDRDLLDLDDULLDDRRULDLDDUUURLDLULLLRRLLRDDULLDLDLDDLDLDULURRDURURDRDRRDLR
RDRLRRUUDRLDUDLLDLUDLUUDUDLRRUUDRDDDLDDLLLRRRUDULLRRRRRURRRLUDDDLRRRRUUULDURDRULLDLRURRUULUDRURRRRLRURLRDUUDUDUDRDDURRURUDLLLLLRURUULRUURLLURDRUURLUDDDRLDDURDLDUDRURDRLRRRRUURDDRRRRURDLUUDRLDRDUULURUDDULLURRDUDLUULLDURRURLUDUUDRDDDUUDDUUUULDLDUDDLUDUUDRURLLULRUUULLRRDDUDDLULDDUUUDLUDDLDDLLRUUDRULLRRDRLLDLLRRLULLRRDDRLRDUULLLUULLDLLUDUDDLRDULUDLDLUDDRRRRDUDLUULLULDLRRDLULRLRRRULRURRDRLULDDUDLDLDULLURLLRDLURRULURDLURLUDRDRRUUDRLLUDDRLRDDUURLRRDUDLDRURDUUUDRRLLRDLDLLDRRURLUDURUULDUDLDDDDRUULLDDRLRURRDURLURRLDDRRRRLRLRDRURUDDRDLDRURLULDDL
RULRDLDDLRURDDDDDDRURLLLDDDUUULLRRDLDLURUURLUDLURRLUDUURDULDRUULDDURULDUULDDULLLUDLRULDRLDLRDDRRDLDDLLDRRUDDUDRDUULUDLLLDDLUUULDDUUULRRDULLURLULDLRLLLRLURLLRLRLDRDURRDUUDDURRULDDURRULRDRDUDLRRDRLDULULDRDURDURLLLDRDRLULRDUURRUUDURRDRLUDDRRLDLDLULRLLRRUUUDDULURRDRLLDLRRLDRLLLLRRDRRDDLDUULRLRRULURLDRLRDULUDRDLRUUDDDURUDLRLDRRUDURDDLLLUDLRLURDUDUDULRURRDLLURLLRRRUDLRRRLUDURDDDDRRDLDDLLDLRDRDDRLLLURDDRDRLRULDDRRLUURDURDLLDRRRDDURUDLDRRDRUUDDDLUDULRUUUUDRLDDD`

// Direction = "R" | "L" | "U" | "D"

const A = "A"
const B = "B"
const C = "C"
const D = "D"

const move1 = R.cond([
  [R.equals("R"), R.always(1)],
  [R.equals("L"), R.always(1)],
  [R.equals("U"), R.always(1)],
  [R.equals("D"), R.always(3)],
])

const move2 = R.cond([
  [R.equals("R"), R.always(3)],
  [R.equals("L"), R.always(2)],
  [R.equals("U"), R.always(2)],
  [R.equals("D"), R.always(6)],
])

const move3 = R.cond([
  [R.equals("R"), R.always(4)],
  [R.equals("L"), R.always(2)],
  [R.equals("U"), R.always(1)],
  [R.equals("D"), R.always(7)],
])

const move4 = R.cond([
  [R.equals("R"), R.always(4)],
  [R.equals("L"), R.always(3)],
  [R.equals("U"), R.always(4)],
  [R.equals("D"), R.always(8)],
])

const move5 = R.cond([
  [R.equals("R"), R.always(6)],
  [R.equals("L"), R.always(5)],
  [R.equals("U"), R.always(5)],
  [R.equals("D"), R.always(5)],
])

const move6 = R.cond([
  [R.equals("R"), R.always(7)],
  [R.equals("L"), R.always(5)],
  [R.equals("U"), R.always(2)],
  [R.equals("D"), R.always(A)],
])

const move7 = R.cond([
  [R.equals("R"), R.always(8)],
  [R.equals("L"), R.always(6)],
  [R.equals("U"), R.always(3)],
  [R.equals("D"), R.always(B)],
])

const move8 = R.cond([
  [R.equals("R"), R.always(9)],
  [R.equals("L"), R.always(7)],
  [R.equals("U"), R.always(4)],
  [R.equals("D"), R.always(C)],
])

const move9 = R.cond([
  [R.equals("R"), R.always(9)],
  [R.equals("L"), R.always(8)],
  [R.equals("U"), R.always(9)],
  [R.equals("D"), R.always(9)],
])

const moveA = R.cond([
  [R.equals("R"), R.always(B)],
  [R.equals("L"), R.always(A)],
  [R.equals("U"), R.always(6)],
  [R.equals("D"), R.always(A)],
])

const moveB = R.cond([
  [R.equals("R"), R.always(C)],
  [R.equals("L"), R.always(A)],
  [R.equals("U"), R.always(7)],
  [R.equals("D"), R.always(D)],
])

const moveC = R.cond([
  [R.equals("R"), R.always(C)],
  [R.equals("L"), R.always(B)],
  [R.equals("U"), R.always(8)],
  [R.equals("D"), R.always(C)],
])

const moveD = R.cond([
  [R.equals("R"), R.always(D)],
  [R.equals("L"), R.always(D)],
  [R.equals("U"), R.always(B)],
  [R.equals("D"), R.always(D)],
])

const move = dir => R.cond([
  [R.equals(1), R.always(move1(dir))],
  [R.equals(2), R.always(move2(dir))],
  [R.equals(3), R.always(move3(dir))],
  [R.equals(4), R.always(move4(dir))],
  [R.equals(5), R.always(move5(dir))],
  [R.equals(6), R.always(move6(dir))],
  [R.equals(7), R.always(move7(dir))],
  [R.equals(8), R.always(move8(dir))],
  [R.equals(9), R.always(move9(dir))],
  [R.equals(A), R.always(moveA(dir))],
  [R.equals(B), R.always(moveB(dir))],
  [R.equals(C), R.always(moveC(dir))],
  [R.equals(D), R.always(moveD(dir))],
])

const initialModel = { currentDigit: 5, passcode: [] }

const findDigit = (model, direction) => {
  const { currentDigit } = model
  const moveInDirection = move(R.head(direction))
  const transformations = {
    currentDigit: R.always(moveInDirection(currentDigit))
  }
  return R.evolve(transformations, model)
}

const updatePasscode = model => R.assoc(
  "passcode",
  R.append(R.prop("currentDigit", model), R.prop("passcode", model)),
  model
)

const pipeline = R.pipe(
  R.split("\n"),
  R.reduce(
    (acc, directions) => R.pipe(
      R.reduce((m, d) => findDigit(m, d), acc),
      updatePasscode
    )(directions),
    initialModel
  )
)

const output = pipeline(input)

console.log(output)
