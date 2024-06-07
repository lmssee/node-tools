import { readInput } from "index";

(async () => {
  console.log('i am in 1');

  await readInput((value, key) => {
    console.log("*******");
    if (Number(value) == 1) return true;
    return false
  }, 1)
}
)();
(async () => {
  console.log('i am in 2');
  await readInput((value, key) => {
    console.log("--------");
    if (Number(value) == 2) return true;
    return false
  }, 2)
}
)();
(async () => {
  console.log('i am in 3')
  await readInput((value, key) => {
    console.log("-----*********************---");
    if (Number(value) == 3) return true;
    return false
  }, 3)
}
)();

export default {};