import React, { useState } from 'react';
import './style.css';

const images = ["cat1.jpg", "cat2.jpg", "cat3.jpg", "cat4.jpg", "cat5.jpg", "cat6.jpg", "cat7.jpg", "cat8.jpg"];

const API_BASE = 'http://localhost:3000';
let CURRENT_CAT = images[Math.floor(Math.random() * images.length)];

export default function App() {
    const [count, setCount] = useState(0);
    const [useRedis, setUseRedis] = useState(false);
    const [tooltip, setTooltip] = useState('Mode volatile (non persistant)');

    const handleClick = async () => {
        if (useRedis) {
            try {
                const res = await fetch(`${API_BASE}/api/click`);
                const data = await res.json();
                if (data.count !== null) {
                    setCount(data.count);
                } else {
                    setCount(prev => prev + 1);
                }
            } catch (err) {
                console.warn('❌ Redis inaccessible, fallback local');
                setCount(prev => prev + 1);
            }
        } else {
            setCount(prev => prev + 1);
        }
        CURRENT_CAT = images[Math.floor(Math.random() * images.length)];
    };

    const handleToggle = async (e) => {
        const isChecked = e.target.checked;

        if (!isChecked) {
            setUseRedis(false);
            setTooltip('Mode volatile (non persistant)');
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/api/use-redis`);
            const { redisAvailable } = await res.json();

            if (redisAvailable) {
                const res2 = await fetch(`${API_BASE}/api/number`);
                const { count: redisCount } = await res2.json();

                setCount(redisCount);

                setUseRedis(true);
                setTooltip('Redis activé');
                return;
            }

            throw new Error('Redis inaccessible');

        } catch {
            setUseRedis(false);
            setTooltip('Redis non disponible, mode volatile');
            e.target.checked = false;
        }
    };

    return (
        <div className="container">
            <div className="box">
                <h1>Click the Cat!</h1>
                <p>Clicks: {count}</p>
                <button onClick={handleClick}>Click me</button>

                <div className="toggle">
                    <label className="switch">
                        <input
                            type="checkbox"
                            onChange={handleToggle}
                            title={tooltip}
                        />
                        <span className="slider"></span>
                    </label>
                    <span className="status-text" title={tooltip}>
                        {useRedis ? 'Redis ON' : 'Redis OFF'}
                    </span>
                </div>

                <img src={`/cats/${CURRENT_CAT}`} alt="cat" />
            </div>
        </div>
    );
}
