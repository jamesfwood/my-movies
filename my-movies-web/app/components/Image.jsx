import React from 'react';

export default class Image extends React.Component {

    render() {
        let source = './images/' + props.source;

        let style = {
            width: '200px',
            margin: '10px 5px 0px 5px'
        };

        return (
            <img src={source} style={style} />
        );
    }
}