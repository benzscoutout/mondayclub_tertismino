import {FC, useEffect, useRef} from 'react';

export interface GameAudioProps {
    autoPlay?: boolean;

    loop?: boolean;

    onDone?: () => void;

    onLoaded?: () => void;

    src: string;

    volume?: number;
}

export const GameAudio: FC<GameAudioProps> = ({
    autoPlay = true,
    loop,
    onDone,
    onLoaded,
    src,
    volume
}) => {
    const ref = useRef<HTMLAudioElement>(null);

    return (
        <audio
            src={src}
            preload="auto"
            playsInline
            autoPlay
            ref={ref}
            loop={Boolean(loop)}
            onEnded={() => onDone && onDone()}
            onCanPlayThrough={() => onLoaded && onLoaded()}
        />
    );
};
