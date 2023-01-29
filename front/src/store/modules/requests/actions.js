import { createRequest } from "@/api/visitors";

export default {
  async contactCoach(context, payload) {
    // const newRequest = {
    //   userEmail: payload.email,
    //   message: payload.message,
    // };
    // const response = await fetch(
    //   `https://vue-http-demo-37d43-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,
    //   {
    //     method: "POST",
    //     body: JSON.stringify(newRequest),
    //   }
    // );
    // const responseData = await response.json();
    // if (!response.ok) {
    //   const error = new Error(responseData.message || "Failed to fetch data.");
    //   throw error;
    // }
    // newRequest.coachId = payload.coachId;
    // newRequest.id = responseData.name;
    // context.commit("addRequest", newRequest);

    try {
      const request = await createRequest(payload);
      if (request) {
        request.coachId = payload.coachId;
        context.commit("addRequest", request);
      }
    } catch (error) {
      throw new Error(error?.message || "Failed to register as a request.");
    }
  },

  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://vue-http-demo-37d43-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=${token}`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch data.");
      throw error;
    }
    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      requests.push(request);
    }
    context.commit("setRequests", requests);
  },
};
