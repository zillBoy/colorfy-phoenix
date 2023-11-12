// External Dependencies
import _ from "lodash";

// Internal Dependencies

export const convertColumnKeysIntoObject = (keys: string[]) => {
  return _.map(keys, (key) => ({ key, label: _.upperCase(key) }));
};
