import axios from "axios";
import Cookies from "js-cookie";
import { observable, action } from "mobx";

import history from "../../../history";

import { Leaderboard, Membership } from "../../models/leaderboards/types";
import { Score } from "../../models/profiles/types";
import { leaderboardFromJson, membershipFromJson } from "../../models/leaderboards/deserialisers";
import { scoreFromJson } from "../../models/profiles/deserialisers";

export class DetailStore {
    @observable leaderboard: Leaderboard | null = null;
    @observable rankings: Membership[] = [];
    @observable topScores: Score[] = [];
    @observable isLoading: boolean = false;
    @observable isDeleting: boolean = false;
    @observable isInviting: boolean = false;

    @action
    loadLeaderboard = async (leaderboardId: number) => {
        this.leaderboard = null;
        this.isLoading = true;

        try {
            const leaderboardResponse = await axios.get(`/api/leaderboards/leaderboards/${leaderboardId}`);
            const leaderboard: Leaderboard = leaderboardFromJson(leaderboardResponse.data);
            
            const membersResponse = await axios.get(`/api/leaderboards/leaderboards/${leaderboardId}/members`);
            const members: Membership[] = membersResponse.data.map((data: any) => membershipFromJson(data));
            
            const scoresResponse = await axios.get(`/api/leaderboards/leaderboards/${leaderboardId}/scores`);
            const scores: Score[] = scoresResponse.data.map((data: any) => scoreFromJson(data));

            this.leaderboard = leaderboard;
            this.rankings = members;
            this.topScores = scores;
        } catch (error) {
            console.log(error)
        }

        this.isLoading = false;
    }

    @action
    deleteLeaderboard = async (leaderboardId: number) => {
        this.isDeleting = true;

        try {
            await axios.delete(`/api/leaderboards/leaderboards/${leaderboardId}`, {
                headers: {
                    "X-CSRFToken": Cookies.get("csrftoken")
                }
            });

            // Navigate to leaderboard ist page after deletion
            history.push("/leaderboards");

            this.leaderboard = null;
            this.rankings = [];
            this.topScores = [];
        } catch (error) {
            console.log(error);
        }

        this.isDeleting = false;
    }

    @action
    invitePlayers = async (leaderboardId: number, userIds: number[]) => {
        this.isInviting = true;

        try {
            await axios.post(`/api/leaderboards/leaderboards/${leaderboardId}/invites`, {
                "user_ids": userIds
            }, {
                headers: {
                    "X-CSRFToken": Cookies.get("csrftoken")
                }
            });
        } catch (error) {
            console.log(error);
        }

        this.isInviting = false;
    }
}