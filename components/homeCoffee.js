'use client';

import React, { useRef, useState, useEffect } from 'react'

const HomeCoffee = props => {

    const canvasRef = useRef(null)
    const [frameNumber, setFrameNumber] = useState(0);

    const frameCount = 32;
    const frameCountWidth = 16;
    const frameCountHeight = 2;
    const scaleFactor = 1;
    const spriteWidth = 257;
    const spriteHeight = 257;
    const spriteSheet = "/images/sprites.png";

    useEffect(() => {
        const handleScroll = event => {

            const scrollTop = window.scrollY;
            const maxScrollTop = event.target.scrollingElement.scrollHeight - window.innerHeight;
            const scrollFraction = scrollTop / maxScrollTop;
            const frame = Math.ceil((scrollFraction * frameCount));
            const frameNumber = Math.min(
                frameCount - 1,
                frame
            );
            setFrameNumber(frameNumber);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
    }, [frameNumber]);

    return <canvas ref={canvasRef} {...props} />
}

export default HomeCoffee;