const _get = require("lodash/get");

let baseUrl = null;
module.exports = (axiosInstance) => {
  return {
    async fetchAll (url, page = 1, aggregatedData = []) {
      return axiosInstance({
        url: `${url}&page=${page}`
      }).then(response => {
        aggregatedData.push(..._get(response, "data.values", []));
        if (response.data.next) {
          return this.fetchAll(url, ++page, aggregatedData);
        }
        return aggregatedData;
      });
    },
    async fetch (filters) {
      const filtersArray = [];

      if (_get(filters, "kind")) {
        filtersArray.push(`kind="${filters.kind}"`);
      }

      if (_get(filters, "assignee")) {
        filtersArray.push(`assignee.nickname="${filters.assignee}"`);
      }

      const preparedFilters = filtersArray.join(" AND ");
      return this.fetchAll(`issues?q=${preparedFilters}`);
    },
    async close (issue) {
      return axiosInstance({
        method: "POST",
        url: `issues/${issue.id}/changes`,
        data: {
          "changes": {
            "state": {
              "new": "closed"
            }
          },
          "message": {
            "raw": "Closed"
          }
        }
      }).then(response => {
        return response;
      }).catch(e => {
        return e;
      });
    }
  };
};
