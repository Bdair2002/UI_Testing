import { http, HttpResponse, delay } from "msw";
import { mockedSuccessUser } from "./data/signupMockData";
export const handlers = [
  http.post("*/users", () => {
    return HttpResponse.json({ status: 201, user: mockedSuccessUser });
  }),
];
