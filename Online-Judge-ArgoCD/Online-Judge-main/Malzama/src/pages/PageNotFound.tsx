import React from 'react';
import { Link } from 'react-router-dom';
import "../index.css";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>404 Not Found</h1>
            <p style={styles.message}>Oops! The page you are looking for does not exist.</p>
            <button
                className="submitBtn"
                onClick={() => {
                    navigate("/");
                }}
            >
                go to home page
            </button>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        color: '#333',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '3rem',
        marginBottom: '1rem',
    },
    message: {
        fontSize: '1.5rem',
        textAlign: 'center',
    },
    button: {
        marginTop: '2rem',
        padding: '0.8rem 1.5rem',
        fontSize: '1.2rem',
        backgroundColor: 'green',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '4px',
    },
};

export default NotFoundPage;