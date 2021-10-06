const URL = "https://api.hatchways.io/assessment/students";

//get method
export const getAll = () => fetch(URL).then(async (res) => await res.json());