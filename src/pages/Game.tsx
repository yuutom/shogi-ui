import React from "react";
import ShogiBoard from "../components/Board/ShogiBoard";

const Game: React.FC = () => {
    return (
        <div>
            <h1>AI対戦</h1>
            <ShogiBoard />
        </div>
    );
};

export default Game;
