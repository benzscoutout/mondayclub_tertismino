import classNames from 'classnames';
import {FC} from 'react';
import {useLetters} from '../../particles/hooks/useLetters';
import {ClassNameProps} from '../../particles/particles.types';
import './applogo.css';
export interface AppLogoProps {
    name: string;

    speed?: number;
}

export const AppLogo: FC<AppLogoProps & ClassNameProps> = ({
    name,
    speed = 200,
    className
}) => {
    const [letters, colors] = useLetters('MONDAY CLUB', speed);
    const [letters2, colors2] = useLetters('TERTIS', speed);
    return (
        <div
            data-testid="app-logo"
            className={classNames('flex flex-col items-center', className)}
        >
            <div className="font-mono text-2xl mb-16 welcome-text">
                welcome to
            </div>
            <div className="flex text-4xl font-logo font-bold">
                {letters.map(({key, char}) => (
                    <div
                        data-testid={`app-logo-${key}`}
                        className={colors[key]}
                        key={key}
                    >
                        {char}
                    </div>
                ))}
            </div>
            <div className="flex text-4xl font-logo font-bold">
                {letters2.map(({key, char}) => (
                    <div
                        data-testid={`app-logo-${key}`}
                        className={colors2[key]}
                        key={key}
                    >
                        {char}
                    </div>
                ))}
            </div>
        </div>
    );
};
