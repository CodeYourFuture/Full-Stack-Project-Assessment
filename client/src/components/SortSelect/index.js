import {Form, Select} from "antd";
import React from 'react';

const SortSelect = (props) => {
    const {handleOrderChange} = props;


    return (
        <Form.Item label="Sort by rating: ">
            <Select
                defaultValue="asc"
                style={{width: 80}}
                onChange={handleOrderChange}
                options={[
                    {value: 'asc', label: 'asc'},
                    {value: 'desc', label: 'desc'},
                ]}
            />
        </Form.Item>
    )
};
export default SortSelect;