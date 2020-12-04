import React from "react";
import "./styles.css";
import {
  useNotification,
  NotificationContext,
  NotificationProvider
} from "./useNotification";

export default function App() {
  return (
    <div className="App">
      <h1>
        Hello Notifications{" "}
        <span role="img" aria-label="waving hand">
          👋
        </span>
      </h1>
      <NotificationProvider>
        <NotificationContext.Consumer>
          {(value) => {
            return (
              <p>
                Are notifications allowed?{" "}
                {value.available ? (
                  <span role="img" aria-label="thumbs up">
                    👍{" "}
                  </span>
                ) : (
                  <span role="img" aria-label="thumbs down">
                    👎
                  </span>
                )}
              </p>
            );
          }}
        </NotificationContext.Consumer>
        <SimpleNotificationButton />
      </NotificationProvider>
    </div>
  );
}

function SimpleNotificationButton() {
  const { notify, notification } = useNotification();
  const title = "simple message";
  const options = {
    body: "simple body"
  };
  if (notification) {
    notification.onshow = () => {
      console.log("showing");
    };
    notification.onclose = () => {
      console.log("closed");
    };
  }
  return (
    <button onClick={() => notify(title, options)}>
      trigger simple notification
    </button>
  );
}
