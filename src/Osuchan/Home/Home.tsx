import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const UpdateTitle = styled.span`
    color: ${props => props.theme.colours.timber};
`;

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home - osu!chan</title>
                <meta name="description" content="osu!chan - osu! stats, custom leaderboards, and much more!" />
            </Helmet>

            <h1>Welcome to osu!chan!</h1>

            <p>
                You can view a player's profile by searching their username in the top right.
                <br />
                You can explore the custom leaderboard system via the link in the above.
            </p>

            <p>
                If you run into any bugs, please report them in the #bugs channel of the <a href="https://discord.gg/z7c9tD6">discord server</a>.
            </p>

            <p>
                If want to help out with the project at all (please help me with design!) check out the #suggestions channel of the <a href="https://discord.gg/z7c9tD6">discord server</a>.
                <br />
                You can also check out the code over at the github repos for the <a href="https://github.com/Syriiin/osuchan-frontend">frontend web app</a> and/or the <a href="https://github.com/Syriiin/osuchan-backend">backend server</a>.
            </p>

            <br />

            <h2>Changelog</h2>

            <h3>22nd July 2020 - <UpdateTitle>Leaderboards Anniversary Update</UpdateTitle></h3>
            <ul>
                <li>Completely redesign leaderboard listing page with tabs for global/community and for gamemodes</li>
                <li>Add private leaderboards visible to you back to main leaderboard listing</li>
                <li>Add "Joined Leaderboards" section with leaderboard ranks to leaderboard listing</li>
                <li>Add leaderboards ranks to global leaderboard listing</li>
                <li>Add leaderboard rank to profile leaderboard listing, as well as global leaderboard ranks</li>
                <li>Redesign leaderboard home pages</li>
                <li>Add "Edit Leaderboard" button for leaderboard owners</li>
                <li>Add "Kick Member" button for leaderboard owners</li>
                <li>Add "Archive/Restore Leaderboard" buttons for leaderboard owners (archiving stops updates for the leaderboard so it doesn't contribute to your leaderboard limit)</li>
                <li>Add custom icon support for community leaderboards</li>
                <li>Add player country flags next to their name and avatar in rankings</li>
                <li>Add tooltips for a bunch of things (mods, dates, rounded numbers, flags, etc...)</li>
                <li>Change how dates are shown (past one year ago will show month and year)</li>
                <li>Fix scores with unranked mods being treated as ranked (ie. ScoreV2)</li>
                <li>Make lots of things look nicer</li>
                <li>Misc bug fixes</li>
            </ul>

            <h3>20th June 2020</h3>
            <ul>
                <li>Add loading indicators to buttons</li>
                <li>Add confirmation messages to destructive actions</li>
                <li>Misc bug fixes</li>
            </ul>

            <h3>17th June 2020</h3>
            <ul>
                <li>Add invite management page for leaderboard owners</li>
                <li>Add ability to decline invites from the "My Invites" page</li>
                <li>Change button colour scheme</li>
                <li>Misc bug fixes</li>
            </ul>

            <h3>16th June 2020</h3>
            <ul>
                <li>Add notifications for various things (creating leaderboard, loading scores, inviting players, etc...)</li>
                <li>Make navbar menus look a bit nicer</li>
                <li>Add ability to send a message along with your leaderboard invites</li>
                <li>Misc bug fixes</li>
            </ul>

            <h3>15th June 2020</h3>
            <ul>
                <li>Add "My Invites" page made navbar invite list look nicer</li>
                <li>Add length support for score filters</li>
                <li>Misc bug fixes</li>
            </ul>

            <h3>14th June 2020</h3>
            <ul>
                <li>Add score set support for leaderboards</li>
                <li>Add the ability to save score filter presets</li>
                <li>Enable profile sandbox for taiko, catch, and mania (score sets and score editing not supported yet)</li>
                <li>Add new logo</li>
                <li>Make various things look a bit nicer</li>
                <li>Misc bug fixes</li>
                <li>A BUNCH of refactoring and code quality cleanup</li>
            </ul>

            <h3>31st March 2020</h3>
            <ul>
                <li>Add fully featured score filtering to profile sandbox</li>
                <li>Misc bug fixes</li>
            </ul>

            <h3>22nd February 2020</h3>
            <ul>
                <li>Add notice in profiles for inactive players and unplayed gamemodes</li>
                <li>Improve handling of restricted users</li>
            </ul>

            <h3>21st January 2020</h3>
            <ul>
                <li>Add sandbox settings to customise the score set (ie. normal/no-choke) and allow loved scores</li>
                <li>Add pp distribution charts to profiles</li>
                <li>Only show 5 scores on profiles by default</li>
                <li>Misc cleanup in profiles</li>
            </ul>

            <h3>9th January 2020</h3>
            <ul>
                <li>Make "Add Scores" osu! Profile URL default to the currently logged in user</li>
                <li>Fix loved maps appearing in profiles and affecting score-style</li>
                <li>Fix incorrect key values for osu!mania when certain mods are used</li>
                <li>Fix the site appearing completely broken on some browsers</li>
            </ul>

            <br />

            <h2>FAQ</h2>
            
            <h3>
                <em>Where are all the features that classic osu!chan has?</em>
            </h3>
            <p>
                Some of classic osu!chan's features will be coming to this version in new and improved forms, and some will not.
                <br />
                For example, at the moment, I don't have any plans on implementing the Mod PP statistics from classic osu!chan as they are somewhat replaced by the global leaderboards.
                <br />
                But other features like no-choke statistics will be coming in the future in a much improved form.
            </p>
            
            <h3>
                <em>Why didn't my score submit?</em>
            </h3>
            <p>
                Score submissions work by checking your top 100 pp scores, as well as your last 50 plays (including fails/retries) for osu!standard.
                <br />
                Because of this, if you wait too long after making a score before checking osu!chan, the play will not be retrieved.
                <br />
                Additionally, profile updates have a cooldown of 5 minutes, so sometimes you might have to wait a couple minutes to see new scores.
                <br />
                If there is a score that is not retrieved by normal means, you can use the Add Scores button in the top right menu to manually add scores for specific beatmaps.
            </p>
            
            <h3>
                <em>Why doesn't osu!chan check the last 50 plays for non-standard gamemodes?</em>
            </h3>
            <p>
                The osu!api endpoint used for this doesn't return pp values for scores.
                <br />
                This means that any scores retrieved with this method need to have their pp calculated by osu!chan, which can only be done for osu!standard at this point.
            </p>
            
            <h3>
                <em>Why is the pp for some of my scores different to the osu! website?</em>
            </h3>
            <p>
                As mentioned in the previous answer, some scores need to have their pp calculated by osu!chan rather than getting the data from osu!.
                <br />
                osu!chan uses <a href="https://github.com/Francesco149/oppai-ng">oppai</a> to calculate pp for these scores, which can sometimes have slight differences to official pp values.
            </p>
            
            <h3>
                <em>I created a leaderboard, but it isn't showing up in the leaderboard list. Why?</em>
            </h3>
            <p>
                The Community Leaderboard list at the moment only displays the top 25 public leaderboards (by number of members).
                <br />
                You can view all the leaderboards a user has joined (except private ones you aren't a member of) in their profile.
                <br />
                You will be able to see any leaderboards you create in your profile too.
                <br />
                To view any private leaderboards you are a member of, you need to check the list in your profile.
            </p>
        </>
    );
}

export default Home;
