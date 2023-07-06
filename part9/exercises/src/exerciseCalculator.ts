import { isNotNumber } from '../utils/isNotNumber';

type hours = number;
type days = number;
type score = 1 | 2 | 3;
type scoreDescription =
  | 'unsatisfactory workout'
  | 'not too bad but could be better'
  | 'great workout';

interface result {
  periodLength: days;
  trainingDays: days;
  success: boolean;
  rating: score;
  ratingDescription: scoreDescription;
  target: hours;
  average: hours;
}

function parseArgs(args: string[]): { hoursPerDay: hours[]; target: hours } {
  if (isNotNumber(args[2])) {
    throw new Error('Target must be a number!');
  }

  const target = Number(args[2]);

  for (let arg of args.slice(3)) {
    if (isNotNumber(arg)) {
      throw new Error('Arguments must be numbers!');
    }
  }

  const hoursPerDay = args.slice(3).map((arg) => Number(arg));

  return { hoursPerDay, target };
}

function calculateExercises(hoursPerDay: hours[], target: hours): result {
  const periodLength: days = hoursPerDay.length;
  const trainingDays: days = hoursPerDay.filter((h) => h !== 0).length;
  const average =
    hoursPerDay.reduce((total, cur) => total + cur, 0) / hoursPerDay.length;
  const success = average >= target;

  const descriptionMap = {
    1: 'unsatisfactory workout',
    2: 'not too bad but could be better',
    3: 'great workout',
  };

  const rating =
    periodLength === trainingDays && average >= target
      ? 3
      : average >= target - 0.5 && trainingDays < periodLength
      ? 2
      : 1;

  const ratingDescription = descriptionMap[rating] as scoreDescription;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

try {
  const { hoursPerDay, target } = parseArgs(process.argv);
  console.log(calculateExercises(hoursPerDay, target));
} catch (err) {
  if (err instanceof Error) {
    console.log('Something went wrong!', err.message);
  } else {
    console.log(err);
  }
}
