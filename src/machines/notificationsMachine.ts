import { isEmpty, omit } from "lodash/fp";
import { dataMachine } from "./dataMachine";
import { httpClient } from "../utils/asyncUtils";

export const notificationsMachine = dataMachine("notifications").withConfig({
  services: {
    fetchData: async (ctx, event: any) => {
      const payload = omit("type", event);
      const resp = await httpClient.get(
        `https://develop--gorgeous-strudel-9ed118.netlify.app/notifications`,
        {
          params: !isEmpty(payload) && event.type === "FETCH" ? payload : undefined,
        }
      );
      return resp.data;
    },
    updateData: async (ctx, event: any) => {
      const payload = omit("type", event);
      const resp = await httpClient.patch(
        `https://develop--gorgeous-strudel-9ed118.netlify.app/notifications/${payload.id}`,
        payload
      );
      return resp.data;
    },
  },
});
