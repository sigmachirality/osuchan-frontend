import axios from "axios";
import { observable, action } from "mobx";

import { Score } from "../../models/profiles/types";
import { Membership, Leaderboard } from "../../models/leaderboards/types";
import { membershipFromJson, leaderboardFromJson } from "../../models/leaderboards/deserialisers";
import { scoreFromJson } from "../../models/profiles/deserialisers";
import { unchokeForScoreSet } from "../../../utils/osu";

export class UserStore {
    @observable leaderboard: Leaderboard | null = null;
    @observable membership: Membership | null = null;
    @observable scores: Score[] = [];
    @observable isLoading: boolean = false;

    @action    
    loadUser = async (leaderboardId: number, userId: number) => {
        this.isLoading = true;
        
        try {
            const leaderboardResponse = await axios.get(`/api/leaderboards/leaderboards/${leaderboardId}`);
            const leaderboard: Leaderboard = leaderboardFromJson(leaderboardResponse.data);
        
            const membershipResponse = await axios.get(`/api/leaderboards/leaderboards/${leaderboardId}/members/${userId}`);
            const membership: Membership = membershipFromJson(membershipResponse.data);
            
            const scoresResponse = await axios.get(`/api/leaderboards/leaderboards/${leaderboardId}/members/${userId}/scores`);
            const scores: Score[] = scoresResponse.data.map((data: any) => scoreFromJson(data));

            this.membership = membership;
            // transform scores into their intended form for abnormal score sets
            this.scores = unchokeForScoreSet(scores, leaderboard.scoreSet);
        } catch (error) {
            console.log(error);
        }

        this.isLoading = false;
    }
}
