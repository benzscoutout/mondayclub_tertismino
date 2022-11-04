import classNames from 'classnames';
import {FC, useMemo, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {AppSelectors} from '../../../store/app/app-selectors';
import {ClassNameProps} from '../../particles/particles.types';
import {GameScore} from './GameScore';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../../services/api-service';
import LeaderBoardModel from '../../model/leader-board.model';
export interface GameHighScoresProps {
    selectScores?: any;
}

export const GameHighScores: FC<GameHighScoresProps & ClassNameProps> = ({
    selectScores = AppSelectors.highScores,
    className
}) => {
    const highScores: Array<number> = useSelector(selectScores);
    const scores = useMemo(() => {
        return [...(highScores || []), ...Array(10).fill(0)].slice(0, 9);
    }, [highScores]);

    useEffect( () => {
        readData();
    }, [])
    
    const [leaderScore, setLeaderScore] = useState<LeaderBoardModel[]>([])

    const readData = async () => {

        const scoreRef = collection(db, "game-tertis");
        const q = query(scoreRef, orderBy("score", "desc"), limit(10));
        const leaderSc: any = [];
        const querySnapshot = await getDocs(q);
        let leaderSC: LeaderBoardModel[] = [];
        querySnapshot.forEach((doc) => {
            leaderSc.push(doc.data());
            const objectSC: LeaderBoardModel = {
                isWinner: doc.data().isWinner,
                name: doc.data().name,
                score: doc.data().score,
                timeStamp: doc.data().timeStamp
            }
            leaderSC.push(objectSC)
        });
        setLeaderScore(leaderSC);
    }
    return (
        <div className={classNames(className, 'flex flex-col text-2xl')}>
            {leaderScore.map((score, indx) => (
                <GameScore key={indx} rank={indx + 1} score={score.score} name={score.name} />
            ))}
        </div>
    );
};
