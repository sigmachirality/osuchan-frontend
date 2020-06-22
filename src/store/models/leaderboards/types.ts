import { OsuUser, ScoreFilter } from "../profiles/types";
import { LeaderboardAccessType } from "./enums";
import { Gamemode } from "../common/enums";
import { ScoreSet } from "../profiles/enums";

export interface Leaderboard {
    id: number;
    gamemode: Gamemode;
    scoreSet: ScoreSet;
    accessType: LeaderboardAccessType;
    name: string;
    description: string;
    iconUrl: string;
    allowPastScores: boolean | null;
    memberCount: number | null;
    scoreFilter: ScoreFilter | null;
    scoreFilterId: number;
    owner: OsuUser | null;
    ownerId: number | null;
    creationTime: Date;
}

export interface Membership {
    id: number;
    pp: number;
    scoreCount: number;
    rank: number;
    leaderboard: Leaderboard | null;
    leaderboardId: number;
    osuUser: OsuUser | null;
    osuUserId: number;
    joinDate: Date;
}

export interface Invite {
    id: number;
    message: string;
    leaderboard: Leaderboard | null;
    leaderboardId: number;
    osuUser: OsuUser | null;
    osuUserId: number;
    inviteDate: Date;
}
