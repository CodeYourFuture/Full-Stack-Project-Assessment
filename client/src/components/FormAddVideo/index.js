import {Button, Form, Input, Space, Typography} from 'antd';
import React from 'react';
import {isValidYouTubeURL} from "../../helpers/isValidYoutubeURL";
import styles from './index.module.css';


const FormAddVideo = (props) => {
    const {handleAddVideo} = props;
    const [form] = Form.useForm();

    const onSubmit = () => {
        handleAddVideo(form.getFieldsValue());
        form.resetFields();
    }
    return (
        <div className={styles.container}>
            <Typography.Title level={2} style={{textAlign: 'center'}}>Add your favourite video</Typography.Title>
            <Form
                form={form}
                name="ADD_VIDEO"
                onFinish={onSubmit}
                autoComplete="off"
            >
                <Form.Item
                    label="title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input video title!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="URL"
                    name="url"
                    rules={[
                        {
                            required: true,
                        },
                        () => ({
                            validator(_, value) {
                                if (isValidYouTubeURL(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Invalid YouTube URL format!'));
                            },
                        }),
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Space size="small">
                    <Button
                        onClick={() => {
                            form.resetFields();
                        }}
                    >
                        Clear
                    </Button>
                    <Button htmlType="submit" type="primary">
                        Add Video
                    </Button>
                </Space>
            </Form>
        </div>
    )
};
export default FormAddVideo;