const QuizResult = ({no_Of_Questions, correctlyAnswered, restart}) => {
    let percentageOfcorrectlyAnswered = (correctlyAnswered/no_Of_Questions)*100
    return (
        <><h1>Congratulation!</h1>
            <p>You just concluded the quiz</p>
            <p>You correctly answered {correctlyAnswered} questions out of {no_Of_Questions} questions</p>
            <p>Your progrss in percentage is  {`${percentageOfcorrectlyAnswered}%`}</p>
            <button onClick={()=>{restart()}}>RESTART</button>
        </>
    );
}
 
export default QuizResult;