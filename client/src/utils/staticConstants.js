export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  totalRecords: 0,
  totalPages: 1
};

export const ROWS_PER_PAGE_OPTIONS = [10, 25, 50];

export const MODES = ['view', 'add', 'edit'];

export const MAX_PHONE_SIZE = 10;

// email validation
export const EMAIL_REGEX_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const INVALID_EMAIL_FORMAT = "Please enter a valid email.";