import { createCoach, readCoach, readCoaches } from "@/api/coaches";

export default {
  async registerCoach(context, payload) {
    const coachData = {
      areas: payload.areas,
      description: payload.description,
      email: context.rootGetters.email,
      firstName: payload.firstName,
      hourlyRate: payload.hourlyRate,
      lastName: payload.lastName,
    };
    try {
      const coach = await createCoach(coachData);
      if (coach) {
        context.commit("registerCoach", {
          ...coachData,
          id: context.rootGetters.userId,
        });
        localStorage.setItem("isCoach", true);
      }
    } catch (error) {
      throw new Error(error?.message || "Failed to register as a coach.");
    }
  },

  async loadCoaches(context, payload) {
    if (!payload?.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const coaches = await readCoaches();
    context.commit("setCoaches", coaches);
    context.commit("setFetchTimestamp");
  },

  async loadCoach(context, payload) {
    const { id } = payload;
    return (
      context.rootGetters["coaches/getCoachById"](id) || (await readCoach(id))
    );
  },
};
