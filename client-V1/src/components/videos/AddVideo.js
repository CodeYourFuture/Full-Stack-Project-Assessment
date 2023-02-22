import { Button, Form, Input } from "antd";
import React, { useState } from "react";

export default function AddVideo({ addVideo }) {
  const [input, setInput] = useState({
    title: "",
    url: "",
    rating: 0,
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onFinish = async e => {
    // e.preventDefault();

    const res = await fetch("http://localhost:5001", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    addVideo(input, data.id);
    setInput({ ...input, title: "", url: "" });
  };

  return (
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} onFinish={onFinish}>
      <Form.Item label="Title">
        <Input
          name="title"
          value={input.title}
          onChange={handleChange}
          placeholder="input Title"
          required
        />
      </Form.Item>
      <Form.Item label="Url">
        <Input
          name="url"
          value={input.url}
          onChange={handleChange}
          placeholder="input Url"
          required
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
        <Button className="btn-submit" type="primary submit" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
