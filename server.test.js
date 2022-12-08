const supertest = require("supertest");
const createServer = require("./server");

const app = createServer();

test("valid request", () => {
    return supertest(app)
        .get("/api/v1/region?region=asia")
        .expect("Content-Type", /json/)
        .then((res) => {
            expect(res.statusCode).toBe(200);
            expect(res.body.regionTotalPopulation).toBe(4604594974);
            expect(res.body.highestPopulatedCountry).toBe(
                "People's Republic of China"
            );
        });
});

test("invalid request", () => {
    supertest(app)
        .get("/api/v1/region?region=asd")
        .expect("Content-Type", /json/)
        .expect(404)
        .then((response) => {
            expect(response.body.success).toBe("false");
        });
});
