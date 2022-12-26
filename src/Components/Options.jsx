import success from "./media/success-notification_C_major.wav";
import wrong from "./media/wrong.wav";

const Options = ({option, index, correctAnswer, currentAnswer, selectedAnswer, correctAnswerCount}) => {

    const isCorrectAnswer = currentAnswer && option === correctAnswer ? "success" : "";
    const isWrongtAnswer = currentAnswer === option && currentAnswer !== correctAnswer ? "wrong" : "";
    const disabled = currentAnswer ? "disable" : ""

    if (currentAnswer) {
        if (currentAnswer === correctAnswer) {
            new Audio(success).play()
        }else if (currentAnswer !== correctAnswer) {
            new Audio(wrong).play()
        }
    }
    return (
        <button 
            className={`option ${isCorrectAnswer} ${isWrongtAnswer} ${disabled}`} 
            key={index}
            onClick={()=>{selectedAnswer(option)}}
        >
            {option}
        </button>
    );
}
 
export default Options;