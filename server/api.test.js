import request from "supertest";
import app from "./app.js";
import db from "./db.js";

describe("/api", () => {
	describe("/videos", () => {
		describe("GET", () => {
			it("Returns the list of videos", async () => {
				const response = await request(app).get("/api/videos");

				expect(response.statusCode).toBe(200);
				expect(response.body.data[0].title).toBe("Never Gonna Give You Up");
				expect(response.body.data[0].url).toBe(
					"https://www.youtube.com/watch?v=dQw4w9WgXcQ"
				);
			});
		});

		describe("/:id", () => {
			describe("POST", () => {
				it("Returns a successful response if the video is added, containing the new video data", async () => {
					const response = await request(app).post("/api/videos").send({
						title: "Nova Era Live in Sao Paulo",
						url: "https://www.youtube.com/watch?v=jjqp8m5j3Pk",
					});

					expect(response.body.status).toBe(201);
					expect(response.body.data.title).toBe("Nova Era Live in Sao Paulo");
				})
			})

			// describe("DELETE", () => {
			// 	it("Returns a successful response if the id exists", async () => {
			// 		const response = await request(app).delete("/api/videos/1");

			// 		expect(response.statusCode).toBe(200);
			// 	});

			// 	it("Deletes the video from the database if the id exists", async () => {
			// 		await request(app).delete("/api/videos/1");

			// 		const dbResponse = await db.query(
			// 			"SELECT * FROM videos WHERE id = $1",
			// 			[1]
			// 		);
			// 		expect(dbResponse.rows.length).toBe(0);
			// 	});
			// });
		});
	});
});
