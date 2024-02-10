import React from 'react';
import styles from './index.module.css';

const ContentContainer = (props) => {
    const {children} = props
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
};
export default ContentContainer;