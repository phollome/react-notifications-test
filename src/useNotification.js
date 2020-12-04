import React, { createContext, useContext, useEffect, useState } from "react";

const NotificationContext = createContext();

function NotificationProvider(props) {
  const { children } = props;

  const [available, setAvailable] = useState(false);

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      setAvailable(true);
    } else {
      setAvailable(false);
    }
  };

  useEffect(() => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        setAvailable(true);
      } else if (Notification.permission !== "denied") {
        requestPermission();
      }
    }
  }, []);

  return (
    <NotificationContext.Provider value={{ available }}>
      {children}
    </NotificationContext.Provider>
  );
}

function useNotification(props = {}) {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotification must be used within NotificationProvider");
  }

  const { available } = context;

  const [notification, setNotification] = useState();

  const notify = (title, options = {}) => {
    if (available) {
      setNotification(new Notification(title, { ...props, ...options }));
    }
  };

  return { notify, notification };
}

export { useNotification, NotificationProvider, NotificationContext };
