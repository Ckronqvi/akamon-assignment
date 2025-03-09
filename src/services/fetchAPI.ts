
type Result<T> = { success: true; data: T } | { success: false; error: string };

export const fetchData = async (): Promise<Result<any[]>> => {
  try {
    // TODO
    return { success: true, data: [] };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

