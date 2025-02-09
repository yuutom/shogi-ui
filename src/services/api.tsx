import axios from "axios";

const API_URL = "http://localhost:8000";

export const getAiMove = async (sfen: string) => {
    try {
        const response = await axios.post(`${API_URL}/next-move`, { sfen });
        return response.data.move;
    } catch (error) {
        console.error("AI Move Error:", error);
        return null;
    }
};
