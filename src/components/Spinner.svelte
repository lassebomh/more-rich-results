<svg class="mrrSpinner" viewBox="0 0 50 50">
    <circle class="mrrPath" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
</svg>

<style>
    .mrrSpinner {
        animation: mrrRotate 2s linear infinite;
        z-index: 2;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -30px 0 0 -30px;
        width: 30px;
        height: 30px;
    }
    
    .mrrSpinner .mrrPath {
        stroke: rgba(var(--mrr-color), 0.6);
        stroke-linecap: round;
        animation: mrrDash 1.2s ease-in-out infinite;
    }
    
    @keyframes mrrRotate {
        100% {
            transform: rotate(360deg);
        }
    }
    
    @keyframes mrrDash {
        0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
        }
    }
    
</style>