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
            const fromX = parseInt(selectedPiece.from[0], 10);
            const fromY = parseInt(selectedPiece.from[1], 10);
            const toX = parseInt(square[0], 10);
            const toY = parseInt(square[1], 10);
    
            const legalMoves = shogi.getMovesFrom(fromX, fromY);
            // const isLegalMove = legalMoves.some(move => move.from === selectedPiece.from && move.to === square);
    
            if (true) {
                shogi.move(fromX, fromY, toX, toY);
                setShogi(new Shogi());
                setShogi((prevShogi) => {
                    prevShogi.initializeFromSFENString(shogi.toSFENString());  // ✅ `toSFENString()` を正しく使用
                    return prevShogi;
                });
                setSelectedPiece({ from: null, to: null });
    
                axios
                    .post("http://localhost:8000/move", { sfen: shogi.toSFENString() })  // ✅ SFENの取得方法を修正
                    .then((response) => {
                        const aiMove = response.data.move;
                        shogi.move(aiMove.from.x, aiMove.from.y, aiMove.to.x, aiMove.to.y);  // ✅ AIの指し手を適用
                        setShogi(new Shogi());
                        setShogi((prevShogi) => {
                            prevShogi.initializeFromSFENString(shogi.toSFENString());
                            return prevShogi;
                        });
                    })
                    .catch((error) => console.error("AI Move Error:", error));
            }
        }
    };

    return (
        <div className="shogi-container">
            <h2>将棋AI対戦</h2>
            <div className="shogi-board">
                {shogi.board.flat().map((piece, index) => {
                    const square = `${9 - Math.floor(index / 9)}${(index % 9) + 1}`;
                    return (
                        <Square 
                            key={square} 
                            square={square} 
                            piece={piece} 
                            onClick={handleClick} 
                            isSelected={selectedPiece.from === square} 
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ShogiBoard;
