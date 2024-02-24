import React, { PureComponent, Component } from "react";
import { colors } from "./colors";
import * as svgs from "./svgs";

class PickerCanvas extends Component {
    
    shouldComponentUpdate() {
        
        return false;
        
    }
    
    render() {
        
        const { onPick } = this.props;
        return <div className="picker-canvas">
                
            {Object.keys( svgs )
                .map( x => [ x, svgs[ x ] ] )
                .map( ( [ x, Icon ] ) => <Icon key={x} onClick={() => onPick(x)} /> )}
        
        </div>;
        
    }
    
}

function ensureFunction( func, funcName ) {
    
    if ( !func ) throw new Error( `No ${funcName} function was supplied to ProfileCardEditor` );
    
}

class ProfileCardEditor extends PureComponent {
    
    handleChange( e ) {
        
        const { name, value } = e.target;
        const { onChange, profile } = this.props;
        ensureFunction( onChange, "onChange" );
        onChange( { ...profile, [ name ]: value } );

    }
    pickSwatch( value, e ) {
        
        e.preventDefault();
        const { onChange, profile } = this.props;
        ensureFunction( onChange, "onChange" );
        onChange( { ...profile, colour: value } );
        
    }
    pickAvatar( value ) {
        
        const { onChange, profile } = this.props;
        ensureFunction( onChange, "onChange" );
        onChange( { ...profile, avatar: value } );
        
    }
    render() {
        
        const { profile } = this.props;
        return <form className="tc2rst profile-card-editor">
        
            <label>
                
                <span>Name</span>
                <input type="text" name="name" value={profile.name} onChange={this.handleChange.bind( this )} />
                
            </label>
            <label>
            
                <span>Blurb</span>
                <textarea name="blurb" value={profile.blurb} onChange={this.handleChange.bind( this )}></textarea>
            
            </label>
            <label>
                
                <span>Color</span>
                <input type="color" name="colour" value={profile.colour} onChange={this.handleChange.bind( this )} />
            
            </label>
            <div className="swatch-picker" onMouseDown={e => e.preventDefault()}>
                    
                <aside><b>Note:</b> A good colour should be highly complementary to the colours picked by others on your team so that it's easy to distinguish on a graph or in a table. The strongly contrasting colours below are a good start, but you can also use your native colour picker by clicking on the colour input field above.</aside>
                {colors.map( color => <span key={color} className="profile-color-swatch" onClick={e => this.pickSwatch( color, e )} style={{ "backgroundColor": color }} /> )}

            </div>
            <label>
            
                <span>Avatar</span>
                <input type="text" name="avatar" value={profile.avatar} onChange={this.handleChange.bind( this )} />
                
            </label>
            <div className="avatar-picker" onMouseDown={e => e.preventDefault()}>
                
                <aside><b>Note:</b> As well as picking on of the built-in images below, you can also enter a URL. If you <i>do</i> use your own image, try to choose one with a transparent background.</aside>
                <PickerCanvas onPick={x => this.pickAvatar(x)} />
                
            </div>
            
        </form>;
        
    }
    
}

//  , onClick: () => this.pickAvatar( x )

export default ProfileCardEditor;
