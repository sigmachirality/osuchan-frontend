import React from "react";
import styled from "styled-components";

import { modsShortFromBitwise } from "../../utils/osu";
import { Mods } from "../../store/models/common/enums";

const ModsContainer = styled.div`
    display: flex;
`;

const ModImage = styled.img`
    
`;

export function ModIcons(props: ModIconsProps) {
    const mods = modsShortFromBitwise(props.bitwiseMods);

    return (
        <ModsContainer>
            {mods.map((mod, i) => (
                <ModImage key={i} src={`/images/mods/mod_${mod}${props.small ? "" : "@2x"}.png`} />
            ))}
        </ModsContainer>
    )
}

interface ModIconsProps {
    bitwiseMods: Mods;
    small?: boolean;
}
