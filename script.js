body {
    font-family: 'Courier New', Courier, monospace;
    background: #1e1e2f;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    margin: 0;
    padding-top: 20px;
    transition: background 0.5s;
}

body.light {
    background: #f5f5f5;
    color: #111;
}

.container {
    background: #2e2e4f;
    padding: 30px;
    border-radius: 12px;
    width: 700px;
    max-width: 95%;
    text-align: center;
    transition: background 0.5s, color 0.5s;
}

body.light .container {
    background: #fff;
    color: #111;
}

.top-bar {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    gap: 10px;
}

#progress-container {
    width: 100%;
    height: 12px;
    background: #555;
    border-radius: 6px;
    margin-bottom: 10px;
}

#progress-bar {
    height: 12px;
    width: 0%;
    background: #4caf50;
    border-radius: 6px;
    transition: width 0.2s, background 0.2s;
}

#text-display {
    font-size: 20px;
    margin: 20px 0;
    min-height: 120px;
    line-height: 1.5;
    word-wrap: break-word;
}

span.correct { color: #4caf50; }
span.incorrect { color: #f44336; }
span.current-word { background: #4444aa33; border-radius: 3px; }

textarea {
    width: 100%;
    height: 140px;
    padding: 10px;
    font-size: 18px;
    border-radius: 6px;
}

button {
    margin-top: 15px;
    padding: 10px 22px;
    border: none;
    border-radius: 6px;
    background: #ff4d4d;
    color: white;
    cursor: pointer;
    transition: background 0.2s;
}

button:hover { background: #ff1a1a; }

.popup { display: none; position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.7); justify-content:center; align-items:center; }
.popup-content { background:#2e2e4f; padding:30px; border-radius:12px; text-align:center; transition: background 0.5s; }
body.light .popup-content { background:#fff; color:#111; }

.leaderboard { margin-top: 20px; text-align:left; }
body.light .leaderboard { color:#111; }
