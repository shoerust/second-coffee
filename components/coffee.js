'use client';

import React, { useRef, useState, useEffect } from 'react'

const Coffee = props => {

    const canvasRef = useRef(null)
    const [frameNumber, setFrameNumber] = useState(0);

    const frameCount = 10;
    const frameCountWidth = 5;
    const frameCountHeight = 2;
    const spriteWidth = 153;
    const spriteHeight = 150;
    const spriteSheet = "/images/sprites.png";

    useEffect(() => {
        const handleScroll = event => {

            const scrollTop = window.scrollY;
            const maxScrollTop = event.target.scrollingElement.scrollHeight - window.innerHeight;
            const scrollFraction = scrollTop / maxScrollTop * frameCount;
            const frame = Math.ceil((scrollFraction * frameCount) % frameCount);
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

    const draw = context => {
        const img = new Image();
        img.src = spriteSheet;
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

        //Our draw come here
        draw(context)
    }, [frameNumber]);

    return <canvas ref={canvasRef} {...props} />
}

export default Coffee