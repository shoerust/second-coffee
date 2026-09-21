'use client';

import React, { useRef, useEffect } from 'react'

const HomeCoffee = props => {

    const canvasRef = useRef(null)
    const frameRef = useRef(31);
    const animationFrameRef = useRef(null);

    const frameCount = 32;
    const frameCountWidth = 16;
    const scaleFactor = 2;
    const spriteWidth = 257;
    const spriteHeight = 257;
    const spriteSheet = "/images/sprites.png";

    const draw = (context, img, frameNumber) => {
        const row = frameNumber >= frameCountWidth ? 1 : 0;
        const column = row ? frameNumber - frameCountWidth : frameNumber;

        context.drawImage(
            img,
            column * spriteWidth,
            row * spriteHeight,
            spriteWidth,
            spriteHeight,
            0,
            0,
            spriteWidth / scaleFactor,
            spriteHeight / scaleFactor
        );
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = spriteWidth / scaleFactor;
        canvas.height = spriteHeight / scaleFactor;

        const img = new Image();
        let isActive = true;

        img.onload = () => {
            const render = () => {
                if (!isActive) return;

                draw(context, img, frameRef.current);

                if (frameRef.current > 0) {
                    frameRef.current -= 1;
                    animationFrameRef.current = window.requestAnimationFrame(render);
                }
            };

            render();
        };
        img.src = spriteSheet;

        return () => {
            isActive = false;
            if (animationFrameRef.current) {
                window.cancelAnimationFrame(animationFrameRef.current);
            }
            img.onload = null;
        };
    }, []);

    return <canvas ref={canvasRef} {...props} />
}

export default HomeCoffee;
