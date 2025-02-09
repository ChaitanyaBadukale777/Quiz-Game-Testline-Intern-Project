export async function fetchQuizData() {
    const response = await fetch('/quiz-data.json');
    if (!response.ok) {
      throw new Error('Failed to fetch quiz data');
    }
    const data = await response.json();
    return data;
  }



//   const response = await fetch('/quiz-data.json');
