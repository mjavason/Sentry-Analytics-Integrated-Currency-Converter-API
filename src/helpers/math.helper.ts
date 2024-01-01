export function calculateFactorial(n: number): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      if (n < 0) {
        reject(new Error('Invalid input. Factorial is undefined for negative numbers.'));
      } else if (n === 0 || n === 1) {
        resolve(1);
      } else {
        // Recursive calculation: n! = n * (n-1)!
        calculateFactorial(n - 1)
          .then((factorialOfNMinus1) => resolve(n * factorialOfNMinus1))
          .catch(reject);
      }
    });
  }
  