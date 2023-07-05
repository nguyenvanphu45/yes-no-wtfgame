const FetchAnswer = async (compareAnswer) => {
    const response = await fetch('https://yesno.wtf/api');
    const data = await response.json();
    const [answer] = data.answer;
    compareAnswer(answer);
};

export default FetchAnswer;
