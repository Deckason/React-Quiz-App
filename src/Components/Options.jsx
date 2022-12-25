const Options = ({option, index}) => {
    return (
        <button className="option" key={index}>{option}</button>
    );
}
 
export default Options;