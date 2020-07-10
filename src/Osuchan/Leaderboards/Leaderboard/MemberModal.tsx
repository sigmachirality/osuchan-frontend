import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import countries from "i18n-iso-countries";

import { SimpleModal, LoadingSection, Divider, ScoreRow, Button } from "../../../components";
import { StoreContext } from "../../../store";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const UserInfo = styled.div`
    display: flex;
`;

const Avatar = styled.img`
    border-radius: 15px;
    height: 128px;
    width: 128px;
`;

const UserInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    flex-grow: 1;
`;

const UserInfoRow = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3em;
`;

const Username = styled.span`
    font-size: 1.5em;
`;

const Flag = styled.img`
    width: 30px;
    margin-right: 0.5em;
`;

const Rank = styled.span`
    font-size: 3em;
`;

const Performance = styled.span`
    font-size: 1.5em;
`;

const ScoreCount = styled.span`
    font-size: 1em;
`;

const MemberInfo = observer(() => {
    const params = useParams<RouteParams>();
    const store = useContext(StoreContext);
    const detailStore = store.leaderboardsStore.detailStore;

    const userId = parseInt(params.userId);
    const { isLoading, isLoadingMembership, leaderboard, membership, membershipScores, loadMembership } = detailStore;

    useEffect(() => {
        if (isLoadingMembership) {
            document.title = "Loading...";
        } else if (leaderboard && membership) {
            document.title = `${membership.osuUser!.username} - ${leaderboard.name} - osu!chan`;
        } else {
            document.title = `Leaderboard not found - osu!chan`;
        }
    }, [isLoading, isLoadingMembership, leaderboard, membership]);

    useEffect(() => {
        if (leaderboard !== null && !isNaN(userId)) {
            loadMembership(userId);
        }
    }, [userId, leaderboard, loadMembership]);

    const [showAllScores, setShowAllScores] = useState(false);

    return (
        <>
            {!isLoadingMembership && membership && (
                <>
                    <UserInfo>
                        <Avatar src={`https://a.ppy.sh/${membership.osuUserId}`} />
                        <UserInfoContainer>
                            <UserInfoRow>
                                <Username>
                                    {membership.osuUser!.username}
                                </Username>
                            </UserInfoRow>
                            <UserInfoRow>
                                <Flag src={`https://osu.ppy.sh/images/flags/${membership.osuUser!.country}.png`} />
                                {countries.getName(membership.osuUser!.country, "en")}
                            </UserInfoRow>
                            <UserInfoRow>
                                <ScoreCount>{membership.scoreCount} scores</ScoreCount>
                            </UserInfoRow>
                        </UserInfoContainer>
                        <UserInfoContainer>
                            <UserInfoRow>
                                <Rank>#{membership.rank}</Rank>
                            </UserInfoRow>
                            <UserInfoRow>
                                <Performance>{membership.pp.toLocaleString("en", { maximumFractionDigits: 0 })}pp</Performance>
                            </UserInfoRow>
                        </UserInfoContainer>
                    </UserInfo>

                    <Divider spacingScale={5} />

                    {(showAllScores ? membershipScores : membershipScores.slice(0, 5)).map((score, i) => (
                        <ScoreRow key={i} score={score} hidePlayerInfo />
                    ))}
                    {membershipScores.length <= 5 || showAllScores || (
                        <Button type="button" fullWidth action={() => setShowAllScores(true)}>Show More</Button>
                    )}
                    {membershipScores.length === 0 && (
                        <p>This member has no eligible scores for this leaderboard yet...</p>
                    )}
                </>
            )}
            {isLoadingMembership && (
                <LoadingSection />
            )}
        </>
    );
});

const MemberModal = (props: MemberModalProps) => (
    <SimpleModal open={props.open} onClose={props.onClose}>
        <MemberInfo />
    </SimpleModal>
);

interface MemberModalProps {
    open: boolean;
    onClose: () => void;
}

interface RouteParams {
    leaderboardType: "global" | "community";
    gamemode: "osu" | "taiko" | "catch" | "mania";
    leaderboardId: string;
    userId: string;
}

export default MemberModal;