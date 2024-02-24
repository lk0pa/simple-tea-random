import React from "react";
import ProfileCard from "./ProfileCard";

/*
    A team is a group of profiles, along with a name and image representing the team itself
    Constraints on the size of the group are not imposed by this component
    The component serves only to display team information json -> html
*/

const Team = ( { id, name, logo, profiles, className, profileClassName } ) => <article className={ [ "tc2rst team", `team-${id}`, className ].filter( x => x ).join( " " ) }>

    <h3 className="team-name">{name}</h3>
    {logo && <img src={logo} className="team-logo" />}
    {profiles.map( ( p, i ) => <ProfileCard key={i} {...p} className={profileClassName} /> )}
    
</article>;

export default Team;
