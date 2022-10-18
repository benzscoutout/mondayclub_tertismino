import {FC} from 'react';
import {useSelector} from 'react-redux';
import {AppSelectors} from '../../../store/app/app-selectors';
import {GameSelectors} from '../../../store/game/game-selectors';
import {GameAudio} from '../../atoms/game/GameAudio';
import {AUDIO_FILES} from '../../particles/audio.types';

export const GameMusic: FC = () => {
    const music = useSelector(AppSelectors.music);
    const musicVolume = useSelector(AppSelectors.musicVolume);
    const musicType = useSelector(AppSelectors.musicType);
    const paused = useSelector(GameSelectors.paused);

    return (
        <>
            {music && !paused && (
                <GameAudio
                    autoPlay
                    src={AUDIO_FILES[musicType]}
                    volume={musicVolume / 100}
                    loop={true}
                />
            )}
        </>
    );
};
