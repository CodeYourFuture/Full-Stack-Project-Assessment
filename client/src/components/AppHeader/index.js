import {Layout, Typography} from "antd";
import React from 'react';

import './index.css'

const AppHeader = () => {
    const {Header} = Layout;

    return (
        <Header className='header'>
            <Typography.Title level={1} className='header_title'>
                Video Recommendation
            </Typography.Title>
        </Header>
    )
};
export default AppHeader;