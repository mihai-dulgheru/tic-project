import { createCoach, readCoaches } from "../../../../api/coaches";

export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const coachData = {
      areas: payload.areas,
      description: payload.description,
      email: context.rootGetters.email,
      firstName: payload.firstName,
      hourlyRate: payload.hourlyRate,
      lastName: payload.lastName,
    };
    // const token = context.rootGetters.token;
    // const response = await fetch(
    //   `https://vue-http-demo-37d43-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`,
    //   {
    //     method: "PUT",
    //     body: JSON.stringify(coachData),
    //   }
    // );
    // const responseData = await response.json();
    // if (!response.ok) {
    //   const error = new Error(responseData.message || "Failed to fetch data.");
    //   throw error;
    // }
    // context.commit("registerCoach", {
    //   ...coachData,
    //   id: userId,
    // });
    const coach = await createCoach(coachData);
    if (coach) {
      context.commit("registerCoach", {
        ...coachData,
        id: userId,
      });
    }
  },

  async loadCoaches(context, payload) {
    if (!payload?.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    // TODO: use the API
    // const response = await fetch(
    //   `https://vue-http-demo-37d43-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`
    // );
    // const responseData = await response.json();
    // if (!response.ok) {
    //   const error = new Error(responseData.message || "Failed to fetch data.");
    //   throw error;
    // }
    // const coaches = [];
    // for (const key in responseData) {
    //   const coach = {
    //     id: key,
    //     firstName: responseData[key].firstName,
    //     lastName: responseData[key].lastName,
    //     description: responseData[key].description,
    //     hourlyRate: responseData[key].hourlyRate,
    //     areas: responseData[key].areas,
    //   };
    //   coaches.push(coach);
    // }
    const coaches = await readCoaches();
    context.commit("setCoaches", coaches);
    context.commit("setFetchTimestamp");
  },
};
