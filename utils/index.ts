import { Category, Status } from "../types";

export const isString = (param: unknown): param is string => {
  return typeof param === "string" || param instanceof String;
};

export const isNumber = (param: unknown): param is number => {
  return typeof param === "number" || param instanceof Number;
};

export const isBoolean = (param: unknown): param is boolean => {
  return typeof param === "boolean" || param instanceof Boolean;
};

export const isCategory = (param: string): param is Category => {
  return Object.values(Category)
    .map((v) => v.toString())
    .includes(param);
};

export const findCategoryKey = (categoryValue: Category) => {
  const category = Object.entries(Category).find(
    (entry) => categoryValue === entry[1]
  );
  if (category) {
    return category[0];
  }
};

export const isStatus = (param: string): param is Status => {
  return (
    Object.keys(Status)
      .map((v) => v.toString())
      .includes(param) ||
    Object.values(Status)
      .map((v) => v.toString())
      .includes(param)
  );
};

export const findStatusValue = (statusKey: Status) => {
  const status = Object.entries(Status).find((entry) => statusKey === entry[0]);
  if (status) {
    return status[1];
  }
};

export const findStatusKey = (statusValue: Status) => {
  const status = Object.entries(Status).find(
    (entry) => statusValue === entry[1]
  );
  if (status) {
    return status[0];
  }
};
