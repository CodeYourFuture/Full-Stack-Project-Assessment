import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import { data_url } from "./utils/url";

import { Card, CardOverflow, Divider, Typography, IconButton } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

import Nav from "./Nav";
import CardBottom from "./CardBottom";
import { originalDataType, orderType } from "./utils/types";

function App() {
  const [originalData, setOriginalData] = useState<originalDataType[]>([]);
  const [orderStatus, setOrderStatus] = useState<orderType>({
    asc: false,
    desc: true,
  });
  const [error, setError] = useState<boolean>(false);
  const fetchData = useCallback(async () => {
    try {
      const trueKey: string = Object.keys(orderStatus).find(
        (key) => orderStatus[key] === true
      )!;
      const response = await fetch(`${data_url}?order=${trueKey}`);
      if (!response.ok) throw Error(`Did not receive any data`);
      const data = await response.json();
      setOriginalData(data);
    } catch (err: any) {
      console.error(err);
    }
  }, [orderStatus]);
  useEffect(() => {
    fetchData();
  }, [orderStatus, fetchData]);

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${data_url}${id}`, {
        method: "DELETE",
      });
      fetchData();
    } catch (err: any) {
      console.error(err);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="App">
        <header className="App-header">
          <Nav
            originalData={originalData}
            setOriginalData={setOriginalData}
            fetchData={fetchData}
            orderStatus={orderStatus}
            setOrderStatus={setOrderStatus}
            error={error}
            setError={setError}
          />
        </header>
        <main>
          {originalData.map((item) => (
            <Card variant="outlined" key={item.id}>
              <CardOverflow>
                <LiteYouTubeEmbed
                  id={item.url.substring(item.url.search("=") + 1, 99)}
                  title={item.title}
                />
                <IconButton
                  aria-label="Like minimal photography"
                  size="md"
                  variant="solid"
                  color="danger"
                  sx={{
                    position: "absolute",
                    zIndex: 2,
                    borderRadius: "50%",
                    right: "1rem",
                    bottom: 0,
                    transform: "translateY(50%)",
                  }}
                >
                  <DeleteIcon onClick={() => handleDelete(item.id!)} />
                </IconButton>
              </CardOverflow>

              <Typography level="h2" sx={{ fontSize: "md", my: 2 }}>
                {item.title}
              </Typography>
              <Divider inset="context" />
              <CardBottom item={item} setOriginalData={setOriginalData} />
            </Card>
          ))}
        </main>
      </div>
    </Box>
  );
}

export default App;
