import classNames from 'classnames';
import {FC} from 'react';
import {useUiTheme} from '../../particles/contexts/UiThemeContext';
import {ClassNameProps} from '../../particles/particles.types';
import './game.css';
export interface GameValueProps {
    label: string;

    reverse?: boolean;
}

export const GameValue: FC<GameValueProps & ClassNameProps> = ({
    label,
    reverse = false,
    className,
    children
}) => {
    const {transparent} = useUiTheme();
    return (
        <div
            className={classNames(className, 'flex items-center w-full', {
                'flex-col': !reverse,
                'flex-col-reverse': reverse
            })}
        >
            <div className="flex text-light mb-1">{label}</div>
            <div
                className={classNames('flex w-full flex-col rounded-lg', {
                    'border border-gray-200 border-game-color': transparent,
                    'border-game-color': !transparent,
                    'dark:nm-inset-gray-800': !transparent
                })}
            >
                {children}
            </div>
        </div>
    );
};
