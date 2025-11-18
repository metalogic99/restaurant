export const playNotification = () => {
  const audio = new Audio("/sound/notification.wav");
  audio.play().catch((e) => {
    console.warn("audio play prevented", e);
  });
};
