import React from "react";

interface SquareProps {
    square: string;
    piece: any;
    onClick: (square: string) => void;
    isSelected: boolean;
}

const Square: React.FC<SquareProps> = ({ square, piece, onClick, isSelected }) => {
    return (
        <div
            className={`square ${isSelected ? "selected" : ""}`}
            onClick={() => onClick(square)}
        >
            {piece ? piece.kind.toUpperCase() : ""}
        </div>
    );
};

export default Square;
