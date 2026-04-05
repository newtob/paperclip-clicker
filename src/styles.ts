export function injectStyles(): void {
  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html, body {
      height: 100%;
      width: 100%;
      overflow: hidden;
    }

    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      transition: background-color 300ms ease;
    }

    #app {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100vh;
      width: 100vw;
      padding: 24px 16px;
      position: relative;
    }

    .game-title {
      font-size: clamp(28px, 5vw, 48px);
      font-weight: 800;
      text-align: center;
      color: #222;
      letter-spacing: 2px;
      text-transform: lowercase;
      user-select: none;
    }

    .level-indicator {
      position: absolute;
      top: 24px;
      right: 24px;
      font-size: clamp(14px, 2.5vw, 20px);
      font-weight: 700;
      color: #555;
      user-select: none;
    }

    .device-name {
      font-size: clamp(14px, 2.5vw, 20px);
      font-weight: 600;
      color: #444;
      text-align: center;
      text-transform: capitalize;
      user-select: none;
      margin-top: 8px;
    }

    .svg-container {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .svg-container svg {
      transition: transform 150ms ease;
      width: clamp(150px, 30vw, 250px);
      height: auto;
    }

    .svg-container:hover svg {
      transform: scale(1.1);
    }

    .svg-container:active svg,
    .svg-container.squish svg {
      transform: scale(0.9);
    }

    .clip-counter {
      font-size: clamp(32px, 6vw, 56px);
      font-weight: 900;
      color: #111;
      text-align: center;
      user-select: none;
      font-variant-numeric: tabular-nums;
      min-height: 60px;
    }

    .upgrade-btn {
      display: none;
      margin-top: 12px;
      padding: 12px 28px;
      font-size: clamp(16px, 3vw, 22px);
      font-weight: 700;
      border: 3px solid #333;
      border-radius: 16px;
      background: #ffe066;
      color: #222;
      cursor: pointer;
      transition: transform 100ms ease, background-color 200ms ease;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .upgrade-btn:hover {
      background: #ffd633;
      transform: scale(1.05);
    }

    .upgrade-btn:active {
      transform: scale(0.95);
    }

    .upgrade-btn.visible {
      display: block;
    }

    .win-message {
      font-size: clamp(28px, 5vw, 48px);
      font-weight: 900;
      color: #fff;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
      text-align: center;
      animation: win-pulse 1s ease-in-out infinite;
      user-select: none;
    }

    @keyframes win-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    @keyframes rainbow-bg {
      0% { background-color: #ff20ff; }
      14% { background-color: #ff5040; }
      28% { background-color: #ff8830; }
      42% { background-color: #f0e020; }
      57% { background-color: #40e880; }
      71% { background-color: #60a0ff; }
      85% { background-color: #b090ff; }
      100% { background-color: #ff20ff; }
    }

    body.win-state {
      animation: rainbow-bg 3s linear infinite;
    }

    .next-level-info {
      position: absolute;
      bottom: 24px;
      right: 24px;
      font-size: clamp(12px, 2vw, 16px);
      font-weight: 600;
      color: #555;
      text-align: right;
      user-select: none;
    }

    .auto-click-label {
      font-size: clamp(12px, 2vw, 16px);
      font-weight: 600;
      color: #333;
      text-align: center;
      margin-top: 4px;
      user-select: none;
    }
  `;
  document.head.appendChild(style);
}
