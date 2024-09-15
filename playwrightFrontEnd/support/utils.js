export const fetchNumberFromText = (string) => {
    const numbers = string.replace(/\D/g, '');
    return numbers;
  }