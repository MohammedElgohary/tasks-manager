const TIMEOUT_VALUES = [10, 20, 30, 40, 50];

export async function sleepRandom(): Promise<void> {
  const timeout =
    TIMEOUT_VALUES[Math.floor(Math.random() * TIMEOUT_VALUES.length)];

  return await new Promise((resolve) => setTimeout(resolve, timeout));
}
