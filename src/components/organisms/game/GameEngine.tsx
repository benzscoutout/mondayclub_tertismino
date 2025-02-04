import classNames from 'classnames';
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../store/app-store';
import {GameActions} from '../../../store/game/game-actions';
import {GameSelectors} from '../../../store/game/game-selectors';
import {GameTicker} from '../../atoms/game/GameTicker';
import {GameTimer} from '../../atoms/game/GameTimer';
import {GameGrid} from '../../molecules/game/GameGrid';
import {GameMusic} from '../../molecules/game/GameMusic';
import {GamePreloader} from '../../molecules/game/GamePreloader';
import {GameSoundTracks} from '../../molecules/game/GameSoundTracks';
import {GameToast} from '../../molecules/game/GameToast';
import {useUiTheme} from '../../particles/contexts/UiThemeContext';
import {useDocVisible} from '../../particles/hooks/useDocVisible';
import {ClassNameProps} from '../../particles/particles.types';
import '../../atoms/game/game.css';

export const GameEngine: FC<ClassNameProps> = ({className}) => {
    const [loaded, setLoaded] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const dispatch = useAppDispatch();
    const visible = useDocVisible();
    const [isRun, setIsRun] = useState(false);
    const starting = useSelector(GameSelectors.starting);
    const running = useSelector(GameSelectors.running);
    const finishing = useSelector(GameSelectors.finishing);
    const restartTicker = useSelector(GameSelectors.restartTicker);
    const toast = useSelector(GameSelectors.toastMessage);
    const speed = useSelector(GameSelectors.speed);

    useEffect(() => {
        if (toast) {
            setShowToast(true);
            const id = setTimeout(() => {
                setShowToast(false);
            }, 1000);
            return () => {
                setShowToast(false);
                clearTimeout(id);
            };
        }
    }, [toast]);

    useEffect(() => {
        if (!visible) {
            dispatch(GameActions.pause());
        }
    }, [visible, dispatch]);

    const isRunning = () => {
        setIsRun(true);
    };

    const {transparent} = useUiTheme();

    return (
        <div
            className={classNames(
                className,
                'flex relative overflow-hidden rounded-lg desktop:p-4 width-grid mx-auto',
                {
                    'border border-gray-200 border-game-color': transparent,
                    'border-game-color': !transparent,
                    'dark:nm-inset-gray-800': !transparent
                }
            )}
        >
            <GameGrid />
            <GameSoundTracks />
            {/* {starting && !loaded && (
                <GamePreloader
                    className="absolute w-full h-full -m-4"
                    onLoaded={() => setLoaded(true)}
                />
            )} */}
            {starting && !loaded && (
                <GameTimer
                    className="absolute w-full h-full -m-4"
                    onStart={() => dispatch(GameActions.run()) && isRunning()}
                />
            )}
            {showToast && (
                <GameToast
                    className="absolute w-full h-full -m-4"
                    message={toast!}
                />
            )}
            {loaded && <GameMusic />}
            {running &&
                [restartTicker].map((key) => (
                    <GameTicker
                        speed={speed}
                        key={key}
                        onTick={() => dispatch(GameActions.tick())}
                    />
                ))}
            {finishing && (
                <GameTicker
                    speed={50}
                    onTick={() => dispatch(GameActions.finishing())}
                />
            )}
        </div>
    );
};
