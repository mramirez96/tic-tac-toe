import '../index.css';

export const Square = ({ value, onClickEvent }) => {
    return (
        <button
            className="square"
            onClick={onClickEvent}>
            {value}
        </button>
    )
}