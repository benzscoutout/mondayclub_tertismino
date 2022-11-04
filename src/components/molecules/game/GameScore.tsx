import classNames from 'classnames';

import {FC, useState} from 'react';
import {GameDigits} from '../../atoms/game/GameDigits';

import {ClassNameProps} from '../../particles/particles.types';


export interface GameScoreProps {
    rank: number;
    name: string;
    score: number;
}

export const GameScore: FC<GameScoreProps & ClassNameProps> = ({
    rank,
    score,
    className,
    name
}) => {

    


    return (
        <div
            className={classNames(
                className,
                'flex font-mono items-baseline space-x-4'
            )}
        >
            <div className="text-light">#{rank}</div>
            <div className="text-light">{name}</div>
            <GameDigits digits={6} value={score} />
        </div>
    );
};
