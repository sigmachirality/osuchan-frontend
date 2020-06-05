import React, { useState } from "react";
import styled from "styled-components";

import { Surface, SurfaceTitle, ScoreRow, Button } from "../../../components";
import { Score } from "../../../store/models/profiles/types";
import ScoreEditModal from "./ScoreEditModal";
import { observer } from "mobx-react-lite";
import { Gamemode } from "../../../store/models/common/enums";

const ScoresSurface = styled(Surface)`
    padding: 20px;
    grid-area: scores;
`;

function ProfileScoreRow(props: ProfileScoreRowProps) {
    const [editModalOpen, setEditModalOpen] = useState(false);

    const score = props.score;
    const sandboxMode = props.sandboxMode;
    const gamemode = props.gamemode;

    return (
        <>
            <ScoreRow actionButton={sandboxMode && gamemode === Gamemode.Standard} actionButtonText="Edit" actionButtonOnClick={() => setEditModalOpen(true)} score={score} hidePlayerInfo />
            <ScoreEditModal score={score} gamemode={gamemode} open={editModalOpen} onClose={() => setEditModalOpen(false)} />
        </>
    );
}

interface ProfileScoreRowProps {
    score: Score;
    gamemode: Gamemode;
    sandboxMode: boolean;
}

function Scores(props: ScoresProps) {
    const [showAllScores, setShowAllScores] = useState(false);

    return (
        <ScoresSurface>
            <SurfaceTitle>
                Scores
            </SurfaceTitle>
            {(showAllScores ? props.scores : props.scores.slice(0, 5)).map((score, i) => (
                <ProfileScoreRow key={i} score={score} gamemode={props.gamemode} sandboxMode={props.sandboxMode} />
            ))}
            {showAllScores || (
                <Button fullWidth onClick={() => setShowAllScores(true)}>Show all scores</Button>
            )}
        </ScoresSurface>
    );
}

interface ScoresProps {
    scores: Score[];
    gamemode: Gamemode;
    sandboxMode: boolean;
}

export default observer(Scores);
