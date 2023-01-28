'use client';

import React, { useRef, useState, useEffect } from 'react'

const Coffee = props => {

    const canvasRef = useRef(null)
    const [frameNumber, setFrameNumber] = useState(0);

    const frameCount = 32;
    const frameCountWidth = 16;
    const frameCountHeight = 2;
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

    useEffect(() => {
        const img = new Image();
        img.src = spriteSheet;
    }, []);

    const draw = (context, img) => {
        var y = 20;
        var x = frameNumber * spriteWidth;
        if (frameNumber >= frameCountWidth) {
            x = (frameNumber - frameCount / frameCountHeight) * spriteWidth;
            y += spriteHeight;
        }
        context.drawImage(
            img,
            x,
            y,
            img.width,
            img.height,
            0,
            0,
            img.width,
            img.height
        );
    }

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = spriteWidth;
        canvas.height = spriteHeight;
        const context = canvas.getContext('2d')
        const img = new Image();
        img.src = spriteSheet;
        draw(context, img)
    }, [frameNumber]);

    return <canvas ref={canvasRef} {...props} />
}

export default Coffee