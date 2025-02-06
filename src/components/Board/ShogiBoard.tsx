import React, { useState } from "react";
import { Shogi } from "shogi.js";
import axios from "axios";
import Square from "./Square";
import "./styles.css";

const ShogiBoard: React.FC = () => {
    const [shogi, setShogi] = useState(new Shogi());
    const [selectedPiece, setSelectedPiece] = useState<{ from: string | null; to: string | null }>({
        from: null,
        to: null,
    });

    const handleClick = (square: string) => {
        if (!selectedPiece.from) {
            setSelectedPiece({ from: square, to: null });
        } else {
            const move = `${selectedPiece.from}${square}`;
            if (shogi.move(move)) {
                setShogi(new Shogi(shogi.toSFEN()));
                setSelectedPiece({ from: null, to: null });

                axios
                    .post("http://localhost:8000/move", { sfen: shogi.toSFEN() })
                    .then((response) => {
                        const aiMove = response.data.move;
                        shogi.move(aiMove);
                        setShogi(new Shogi(shogi.toSFEN()));
                    })
                    .catch((error) => console.error("AI Move Error:", error));
            }
        }
    };

    return (
        <div className="shogi-container">
            <h2>将棋AI対戦</h2>
            <div className="shogi-board">
                {shogi.board().flat().map((piece, index) => {
                    const square = `${9 - Math.floor(index / 9)}${(index % 9) + 1}`;
                    return <Square key={square} square={square} piece={piece} onClick={handleClick} isSelected={selectedPiece.from === square} />;
                })}
            </div>
        </div>
    );
};

export default ShogiBoard;
