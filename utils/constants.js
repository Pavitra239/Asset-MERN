export const JOB_STATUS = {
  PENDING: "pending",
  INTERVIEW: "interview",
  DECLINED: "declined",
};

export const JOB_TYPE = {
  FULL_TIME: "full-time",
  PART_TIME: "part-time",
  INTERNSHIP: "internship",
};

export const JOB_SORT_BY = {
  NEWEST_FIRST: "newest",
  OLDEST_FIRST: "oldest",
  ASCENDING: "a-z",
  DESCENDING: "z-a",
};

export const USER_ROLES = {
  ADMIN: "admin",
  HEAD: "head",
  USER: "user",
};

export const USER_DEPARTMENTS = {
  KITCHEN: "kitchen",
  ACCOUNTS: "accounts",
  DECORATION: "decoration",
};

export const PLACE = {
  AVD: "avd",
  OUTPLACE: "out place",
};

export const PRODUCT_SORT_BY = {
  NEWEST_FIRST: "newest",
  OLDEST_FIRST: "oldest",
  ASCENDING: "a-z",
  DESCENDING: "z-a",
};

export const FIELDS = [
  {
    name: "invoice",
    type: "file",
    label: "Invoice",
  },
  {
    name: "warrantyDate",
    type: "date",
    label: "Warranty Date",
  },
  {
    name: "customerCare",
    type: "text",
    label: "Customer Care",
  },
  {
    name: "power",
    type: "text",
    label: "Power",
  },
  {
    name: "capacity",
    type: "text",
    label: "Capacity",
  },
  {
    name: "serialNumber",
    type: "text",
    label: "Serial Number",
  },
];

// export const FIELDS = ["field1", "field2", "field3", "field4", "field5"];
