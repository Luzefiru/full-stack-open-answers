type centimeters = number;
type kilograms = number;
interface input {
  height: centimeters;
  weight: kilograms;
}

function parseArgs(args: string[]): input {
  if (args.length < 4 || args.length > 4) {
    throw new Error('Not enough arguments!');
  } else if (
    typeof Number(args[2]) !== 'number' ||
    typeof Number(args[3]) !== 'number'
  ) {
    throw new Error('Arguments must be numbers!');
  } else {
    return { height: Number(args[2]), weight: Number(args[3]) };
  }
}

function calculateBMI(height: centimeters, weight: kilograms): string {
  const heightInMeters = height / 100;
  const BMI = weight / Math.pow(heightInMeters, 2);

  if (BMI >= 40.0) {
    return 'Obese (Class III)';
  } else if (BMI >= 35.0) {
    return 'Obese (Class II)';
  } else if (BMI >= 30.0) {
    return 'Obese (Class I)';
  } else if (BMI >= 25.0) {
    return 'Overweight (Pre-obese)';
  } else if (BMI >= 18.5) {
    return 'Normal range';
  } else if (BMI >= 17) {
    return 'Underweight (Mild thinness)';
  } else if (BMI >= 16) {
    return 'Underweight (Moderate thinness)';
  } else {
    return 'Underweight (Severe thinness)';
  }
}

const { height, weight } = parseArgs(process.argv);
console.log(calculateBMI(height, weight));
