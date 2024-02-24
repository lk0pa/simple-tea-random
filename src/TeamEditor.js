import React, { Component } from "react";
import ProfileCard from "./ProfileCard";
import ProfileCardEditor from "./ProfileCardEditor";
import shortid from "shortid";

function handleChangeMissing() { throw new Error( "No onChange handler supplied to the TeamEditor component" ); }

function withEmpties( profiles, maxSize ) {
    
    return profiles.length >= maxSize ? profiles : withEmpties( [ {

        id: shortid(),
        isEmpty: true,
        name: "Empty",
        colour: "#ffffff",
        blurb: "",
        avatar: ""
        
    } ].concat( profiles ), maxSize );

}
class TeamEditor extends Component {
    
    constructor( { team } ) {
    
        super();
        this.state = {
            
            profiles: team.profiles
            
        };
        
    }
    
    static getDerivedStateFromProps(props, state) {
        
        const { selectedProfile, profiles = [] } = state;
        const { team, size } = props;
        let newSelectedProfile = selectedProfile && selectedProfile.isEmpty ? selectedProfile : null;
        for( const profile of team.profiles || [] ) {
            
            if( selectedProfile && profile.id === selectedProfile.id ) {
                
                newSelectedProfile = profile;
                
            }
            let stateProfileIndex = profiles.findIndex( stateProfile => profile.id === stateProfile.id );
            if ( ~stateProfileIndex ) profiles.splice( stateProfileIndex, 1, profile );
            
        }
        const cleanProfiles = profiles.filter( profile => 
            profile.isEmpty || 
            ~team.profiles.findIndex( teamProfile => teamProfile.id === profile.id ) 
        );
        
        return { 
            
            ...state,
            profiles: withEmpties( cleanProfiles, size ),
            selectedProfile: newSelectedProfile
            
        };
        
    }
    
    handleProfileChange( profile ) {
        
        const { onChange = handleChangeMissing, team = {} } = this.props;

        delete profile.isEmpty;
        const profileIndex = team.profiles.findIndex( x => x.id === profile.id );
        if ( ~profileIndex ) {
            
            team.profiles.splice( profileIndex, 1, profile );
            
        } else {
            
            team.profiles.push( profile );
            
        }
        onChange( team );

    }
    
    handleTeamChange( e ) {
        
        const { onChange = handleChangeMissing, team = {} } = this.props;
        if( e.target ) {
            
            onChange( { ...team, [ e.target.name ]: e.target.value } );
            
        } else {
            
            throw new Error( "Not implemented" );
            
        }
        
    }
    
    selectProfile( id ) {
        
        const { profiles, selectedProfile } = this.state;
        if ( selectedProfile && selectedProfile.id === id ) {
            
            this.setState( { selectedProfile: undefined } );
            
        } else {
    
            this.setState( { selectedProfile: profiles.find( p => p.id === id ) } );
            
        }
        
    }
    
    renderSelectedProfileActions() {
        
        const { selectedProfile } = this.state;
        if ( !selectedProfile ) return;
        if ( selectedProfile.isEmpty ) return;
        const { onArchiveProfile, onDeleteProfile } = this.props;
        return <div key="profile-actions" className="profile-actions">

            <button className="done" onClick={() => this.selectProfile( selectedProfile.id )}>Done</button>
            { onArchiveProfile && [
            
                <button key="archive-button" class="danger-button archive" onClick={() => onArchiveProfile( selectedProfile )}>Archive</button>,
                <p key="archive-explanation">Archiving a profile removes the profiles from the active team but retains data associated with the profile. It may be possible to restore the profile to the active team at a later date.</p>
            
            ] }
            { onDeleteProfile && [
            
                <button key="delete-button" className="danger-button delete" onClick={() => onDeleteProfile( selectedProfile )}>Delete</button>,
                <p key="delete-explanation">Deleting a profile purges all record of the profile from the team, including historical data associated with the profile. In most cases we recommend that you Archive the profile instead.</p>
            
            ] }
    
        </div>;
        
    }
    
    renderSelectedProfile() {

        const { selectedProfile } = this.state;
        if ( !selectedProfile ) return;
        return [
            
            <ProfileCardEditor key="profile-editor" profile={selectedProfile} onChange={e => this.handleProfileChange( e )} />,
            this.renderSelectedProfileActions()
        
        ];

    }
    
    render() {
        
        const { className = "", size, team = {} } = this.props;
        const { selectedProfile, profiles } = this.state;
        const classy = ( ...bits ) => bits.filter( x => x ).join( " " );

        return <article className={classy( "team-editor", className, selectedProfile && "editing" )}>

            <form className="team-details-editor">

                <p className="max-size">Maximum size: {size}</p>
                <img src={team.logo} className="team-logo" />
                <input type="text" name="name" value={team.name} className="team-name-editor" onChange={e => this.handleTeamChange( e )} />
                <input type="text" name="logo" value={team.logo} className="team-logo-editor" onChange={e => this.handleTeamChange( e )} />
                
            </form>
            <div className="team-profiles">
            {profiles.map( ( x, index ) =>
            
                <ProfileCard key={x.id} 
                    {...x} 
                    className={ classy( x.isEmpty && "undefined", x === selectedProfile && "selected" ) } 
                    onClick={ id => this.selectProfile( id ) }
                    index={ index } />
            
            )}
            </div>
            {this.renderSelectedProfile()}
            
        </article>;
        
    }
    
}

export default TeamEditor;