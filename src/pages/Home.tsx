import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div>
            <h1>将棋AI対戦</h1>
            <Link to="/game">ゲームを開始</Link>
        </div>
    );
};

export default Home;
