import React, { Component } from "react";
import { render } from "react-dom";

import { ProfileCard, ProfileCardEditor, Team, TeamEditor } from "./";

const sampleProfiles = [ {
    
    id: "imran",
    name: "Imran Munir",
    avatar: "elephant",
    colour: "#ABD71D",
    blurb: "Role: Front-end Engineer\n\nImran does mostly front-end stuff. He's also a big Scrum advocate."

    
},{
    
    id: "sj",
    name: "Dr. Sarah-Jane Gibson",
    avatar: "lion",
    colour: "#FFD100",
    blurb: "Role: Music teacher\n\nSarah-Jane does lots of teaching stuff as well as some working with children with special needs."
    
}, {
    
    id: "steve",
    name: "Steve Jobs",
    avatar: "https://www.imore.com/sites/imore.com/files/field/image/2014/03/topic_steve_jobs.png",
    colour: "#C7E0EF",
    blurb: "Steve criticizes things for a living. But he's also a genius so we put up with him and enjoy what he comes up with (especially the industrial desgin stuff)."
    
} ];

function team() {
    
    return {
    
        name: "Reviewers module team",
        logo: "https://github.com/goofballLogic/tc2-react-simple-teams/raw/master/docs/dalek.png",
        profiles: sampleProfiles.slice( 0 )
    
    };
    
}

class LiveExample extends Component {

    constructor() {
        
        super();
        this.state = { 
            
            ...sampleProfiles[ 0 ],
            styled: true,
            unstyled: false,
            team: team(),
            archived: []
            
        };
        
    }
    handleChange( what, e ) {
        
        this.setState( { [ what ]: e.target.value } );
        
    }
    toggleUnstyled() {
        
        this.setState( { unstyled: !this.state.unstyled } );
        
    }
    handleProfileChange( profile ) {
        
        this.setState( profile );
        
    }
    restoreProfile( index ) {
        
        this.setState( sampleProfiles[ index ] );
        
    }
    renderProfileCard() {
        
        return <ProfileCard 
            id="ben_black"
            name={this.state.name}
            colour={this.state.colour}
            avatar={this.state.avatar}
            blurb={this.state.blurb} />;
                
    }
    handleDeleteProfile( profile ) {
        
        const { team } = this.state;
        team.profiles = team.profiles.filter( x => x.id !== profile.id );
        this.setState( { team } );
        
    }
    handleArchiveProfile( profile ) {
        
        this.handleDeleteProfile( profile );
        const { archived = [] } = this.state;
        archived.push( profile );
        this.setState( { archived } );
        
    }
    
    render() {
    
        let angle = -10;
        let offset = 20;
        const profileStyle = () => {
            
            angle += 5;
            offset += 60;
            return { 
                "transform": `rotateZ(${-angle}deg)`,
                "top": `${offset}px`
            };
            
        };
        profileStyle.reset = () => {
            
            angle = -10;
            offset = 20;
            
        };
        
        return <article>
    
            <section>
            
                <h1>Profile cards</h1>
                <p>A team member has a profile card. The components of a profile card include:</p>
                <ul>
                    <li>Name</li>
                    <li>Colour</li>
                    <li>Avatar</li>
                    <li>Blurb</li>
                </ul>
                <div className="example-data">
                    
                    <button onClick={() => this.restoreProfile( 0 )}>Imran</button>
                    <button onClick={() => this.restoreProfile( 1 )}>Sarah-Jane</button>
                    <button onClick={() => this.restoreProfile( 2 )}>Steve Jobs</button>
                    <label>Unstyled<input onChange={() => this.toggleUnstyled()} type="checkbox" checked={this.state.unstyled} /></label>

                </div>
                {this.state.styled && <div id="profile-card-styled" className="styled-example">
                
                    <p>Styled it can look like this:</p>
                    {this.renderProfileCard()}
                    
                </div>}
                {this.state.unstyled && <div id="profile-card-unstyled" className="unstyled-example">
                    
                    <p>A (mostly) non-styled rendering looks like this:</p>
                    {this.renderProfileCard()}
                    
                </div>}

            </section>
            <section>
            
                <h1>Profile editor</h1>
                <aside>Note: you're editing the profile displayed above</aside>
                <ProfileCardEditor profile={this.state} onChange={profile => this.handleProfileChange( profile )} />
                
            </section>
            <section>
                
                <h1>Profile gallery</h1>
                <div className="team-example">
                    {sampleProfiles.map( profile => <div key={ profile.id } className="styled-example">
                    
                        <ProfileCard {...profile} style={profileStyle()} className="styled-example" /> 
                    
                    </div> )}
                </div>
                
            </section>
            <section>
            
                <h1>A team</h1>
                <Team
                    className="styled-example"
                    { ...this.state.team }
                    />
                
            </section>
            <section>
            
                <h1>A size-constrainted team editor</h1>
                <TeamEditor
                    className="team styled-example"
                    size="6"
                    team={ this.state.team }
                    onChange={ team => this.setState( { team } ) }
                    onArchiveProfile={ profile => this.handleArchiveProfile( profile ) }
                    onDeleteProfile={ profile => this.handleDeleteProfile( profile ) } />
                    
            </section>
            <section>
                
                <h1>Archived profiles</h1>
                <div className="team-example">
                    {profileStyle.reset()}
                    {this.state.archived.map( profile => <div key={ profile.id } className="styled-example">
                    
                        <ProfileCard {...profile} style={profileStyle()} className="styled-example" /> 
                    
                    </div> )}
                
                </div>
                
            </section>
            
        </article>;
        
    }

}

export const renderLiveExample = selector => 

    render( 
    
        <LiveExample />,
        document.querySelector( selector )
    
    );