'use client';

import React, { useRef, useState, useEffect } from 'react'

const HomeCoffee = props => {

    const canvasRef = useRef(null)
    const [frameNumber, setFrameNumber] = useState(32);

    const frameCount = 32;
    const frameCountWidth = 16;
    const frameCountHeight = 2;
    const scaleFactor = 2;
    const spriteWidth = 257;
    const spriteHeight = 257;
    const spriteSheet = "/images/sprites.png";

    const draw = (context, img) => {
        var y = 0;
        var x = frameNumber * spriteWidth;
        if (frameNumber >= frameCountWidth) {
            x = (frameNumber - frameCount / frameCountHeight) * spriteWidth;
            y += spriteHeight;
        }
        context.drawImage(
            img,
            x,
            y,
            spriteWidth,
            spriteHeight,
            0,
            0,
            spriteWidth / scaleFactor,
            spriteHeight / scaleFactor
        );
        window.requestAnimationFrame(() => {
            if (frameNumber > 0) {
                setFrameNumber(frameNumber - 1);
            }
        });
    }

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = spriteWidth / scaleFactor;
        canvas.height = spriteHeight / scaleFactor;
        const context = canvas.getContext('2d')
        const img = new Image();
        img.src = spriteSheet;
        img.onload = () => {
            draw(context, img);
        };
        draw(context, img); //required to avoid flickering in Safari
    }, [frameNumber]);

    return <canvas ref={canvasRef} {...props} />
}

export default HomeCoffee;