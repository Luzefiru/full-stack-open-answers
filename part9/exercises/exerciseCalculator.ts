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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
