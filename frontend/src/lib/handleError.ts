export const handleError = (err: unknown) => {
  let messages: string[] = ['Something went wrong'];

  try {
    const rawMessage = (err as any)?.response?.data?.message;

    if (typeof rawMessage === 'string') {
      try {
        const parsed = JSON.parse(rawMessage);

        if (Array.isArray(parsed)) {
          messages = parsed.map((e) => e.message ?? 'Validation error');
        } else if (parsed?.message) {
          messages = [parsed.message];
        } else {
          messages = [rawMessage];
        }
      } catch {
        messages = [rawMessage];
      }
    } else if (Array.isArray(rawMessage)) {
      messages = rawMessage.map((e) => e.message ?? 'Validation error');
    }
  } catch {
    messages = ['Unexpected error occurred'];
  }
  return messages;
};
