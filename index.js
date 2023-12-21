import readlineSync from 'readline-sync';

const roles = ['камень', 'ножницы', 'бумага'];

const gameResult = [
  [0, -1, 1],
  [-1, 0, 1],
  [1, -1, 0],
];

const getRandomRole = () => {
  const i = Math.round(Math.random() * (roles.length - 1));
  return roles[i];
};

const getRoleIndex = (name) => roles.indexOf(name.toLowerCase());

const getResult = (i, j) => {
  if (i >= 0 && i < roles.length && j >= 0 && j < roles.length) {
    const r = gameResult[i][j];
    return [r, -1 * r, false];
  }
  return [0, 0, true];
};

const Score = () => {
  const score = [0, 0];
  const get = () => score;
  const set = (...res) => {
    for (let i = 0; i < score.length; i += 1) {
      if (res[i] > 0) {
        score[i] += res[i];
      }
    }
  };
  return { get, set };
};

const play = (a, b) => {
  const aIndex = getRoleIndex(a);
  const bIndex = getRoleIndex(b);
  return getResult(aIndex, bIndex);
};

const printGreet = () => {
  console.log('Камень ножницы бумага');
  console.log('=====================');
};

const printResult = (aRes, bRes, score) => {
  if (aRes > bRes) {
    console.log(`Победил пользователь, результат ${score[0]}:${score[1]}`);
  } else if (aRes < bRes) {
    console.log(`Победил компьютер, результат ${score[0]}:${score[1]}`);
  } else {
    console.log(`Ничья, результат ${score[0]}:${score[1]}`);
  }
};

const printErrorMsg = (input) => {
  console.log(`Неправильный ввод: ${input}`);
};

const getUserInput = () => {
  let userInput = '';
  while (getRoleIndex(userInput) === -1) {
    if (userInput.length !== 0) {
      printErrorMsg(userInput);
    }
    userInput = readlineSync.question('Ваш выбор:');
  }
  return userInput;
};

const main = () => {
  let userInput = '';
  let computerInput = '';
  let [userRes, compRes, inputError] = [0, 0, false];
  console.log(userRes, compRes, inputError);
  const score = Score();
  printGreet();
  while (true) {
    userInput = getUserInput();
    computerInput = getRandomRole();
    [userRes, compRes, inputError] = play(userInput, computerInput);
    score.set(userRes, compRes);
    if (inputError === true) {
      printErrorMsg(userInput);
    } else {
      printResult(userRes, compRes, score.get());
    }
  }
};

main();
