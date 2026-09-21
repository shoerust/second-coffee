'use client';

import React, { useRef, useEffect } from 'react'

const ArticleCoffee = props => {

    const canvasRef = useRef(null)
    const imageRef = useRef(null)
    const frameRef = useRef(0)
    const rafRef = useRef(null)
    const scrollPendingRef = useRef(false)

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
        const canvasWidth = spriteWidth / scaleFactor;
        const canvasHeight = spriteHeight / scaleFactor;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const img = new Image();
        imageRef.current = img;
        img.onload = () => {
            draw(context, img, frameRef.current);
        };
        img.src = spriteSheet;

        return () => {
            img.onload = null;
            imageRef.current = null;
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollPendingRef.current) return;

            scrollPendingRef.current = true;
            rafRef.current = window.requestAnimationFrame(() => {
                scrollPendingRef.current = false;

                const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
                const scrollFraction = maxScrollTop > 0
                    ? window.scrollY / maxScrollTop
                    : 0;
                const nextFrame = Math.min(
                    frameCount - 1,
                    Math.floor(scrollFraction * frameCount)
                );

                if (nextFrame === frameRef.current) return;

                frameRef.current = nextFrame;
                const image = imageRef.current;

                if (image) {
                    draw(canvasRef.current.getContext('2d'), image, nextFrame);
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) {
                window.cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    return <canvas ref={canvasRef} {...props} />
}

export default ArticleCoffee
