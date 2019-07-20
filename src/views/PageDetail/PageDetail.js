import React, { Component } from 'react';
import TopBar from '../TopBar/TopBar'
import PageDetailBody from './PageDetailBody';

class PageDetail extends Component {
    componentWillMount() {
        console.log(this.props.match.params.id);
    }
    render() {
        return (
            <div>
                <PageDetailBody {...this.props}/>
            </div>
        )
    }
}

export default PageDetail;