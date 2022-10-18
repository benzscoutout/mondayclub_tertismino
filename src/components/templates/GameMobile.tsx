import {VFC} from 'react';
import {useSelector} from 'react-redux';
import {environment} from '../../environment/environment';
import {GameSelectors} from '../../store/game/game-selectors';
import {AppLogo} from '../atoms/app/AppLogo';
import {GameMusic} from '../molecules/game/GameMusic';
import {GamePieces} from '../molecules/game/GamePieces';
import {GameControls} from '../organisms/game/GameControls';
import {GameEngine} from '../organisms/game/GameEngine';
import {GameNumbers} from '../organisms/game/GameNumbers';
import {usePageView} from '../particles/hooks/usePageView';

export const GameMobile: VFC = () => {
    const running = useSelector(GameSelectors.running);
    usePageView('/game/mobile');
    return (
        <div className="flex flex-col p-4">
            <GameMusic />
            <GameNumbers className="mx-auto gap-2" reverse={true} />
            <div className="grid grid-cols-mobile gap-2 mx-auto">
                <div className="flex flex-col">
                    <GamePieces
                        className="p-1"
                        label="Hold"
                        reverse={true}
                        selectPieces={GameSelectors.hold}
                    />
                </div>
                <GameEngine />
                <div className="flex flex-col">
                    <GamePieces
                        className="p-1"
                        label="Next"
                        reverse={true}
                        selectPieces={GameSelectors.next}
                    />
                </div>
            </div>
            <div className="flex absolute bottom-14 left-4 right-4">
                <GameControls className="w-full" transparent={true} />
            </div>
        </div>
    );
};
