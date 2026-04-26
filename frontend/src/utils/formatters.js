export function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
  }).format(new Date(value));
}

export function formatDateTime(value) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function formatMonthDay(value) {
  const date = new Date(value);
  return {
    month: new Intl.DateTimeFormat("en-US", { month: "short" }).format(date),
    day: new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date),
  };
}
