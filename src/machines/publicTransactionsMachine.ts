import { isEmpty, omit } from "lodash/fp";
import { dataMachine } from "./dataMachine";
import { httpClient } from "../utils/asyncUtils";

export const publicTransactionsMachine = dataMachine("publicTransactions").withConfig({
  services: {
    fetchData: async (ctx, event: any) => {
      const payload = omit("type", event);
      const resp = await httpClient.get(
        `https://develop--gorgeous-strudel-9ed118.netlify.app/transactions/public`,
        {
          params: !isEmpty(payload) ? payload : undefined,
        }
      );
      return resp.data;
    },
  },
});
