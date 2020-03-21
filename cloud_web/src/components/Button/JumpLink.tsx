import React, { Component } from 'react';
import {  Button } from 'antd';

export default class JumpLink extends Component {

    constructor(props: Readonly<{}>) {
        super(props);

    }

    componentDidMount() {


    }

    componentWillUnmount() {

    }
    render() {

        const {
            style,
            type,
            onClick,
            name,
            link
        } = this.props;


        return (
            <Button icon="plus" type={type} onClick={onClick}>
            {name}
          </Button>
        )
    }
}