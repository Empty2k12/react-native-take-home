# Task Documentation

## Task 1: Setting Up the React Native Environment

### Overview:

Set up the React Native environment, clone the Git project, and address Node.js version compatibility.

### Approach:

1. Cloned the Git project.
2. Installed project dependencies using npm.
3. Upgraded Node.js to version 16.10 using nvm.
4. Created a personal branch, "sharf-dev," for development.
5. Ran the React Native app to verify setup.

### Trade-offs:

- Upgrading Node.js for compatibility.

### Challenges:

- Managing Node.js versions with nvm.

---

## Task 2: Loading Users from the Backend

### Overview:

Fetched user data from a backend API, mapped user IDs to usernames, and displayed usernames in the UI with error handling.

### Approach:

1. Created an "apihandler" for API requests.
2. Implemented error handling for various HTTP status codes.
3. Fetched user data from the backend API.
4. Created a function, `getUserName`, to map user IDs to usernames.
5. Integrated user data into the UI, likely using FlatList.

### Trade-offs:

- Basic console-level error handling.

### Challenges:

- Effective integration of asynchronous API data into the UI.

---

## Task 3: Redesign the ToDo Card

### Overview:

Refactored the `ToDoCard` component in React Native to match a provided design, focusing on visual changes, responsiveness, and component reusability.

### Approach:

1. **Icon Integration**: Installed `@types/react-native-vector-icons` to use icons in the component.

2. **Platform-Specific Icons**:

   - iOS: Added icon names to the `.plist` file.
   - Android: Included icons in Android assets.

3. **Component Creation**: Created a `TodoCard` component, accepting `todoListData` and `userName` props.

4. **Design Implementation**: Aligned the component with the design specifications, including layout, colors, and icons.

5. **Responsiveness**: Ensured the `TodoCard` component was responsive to different screen sizes and orientations.

6. **Reusability**: Maintained component reusability for various to-do items.

### Challenges:

- Handling platform-specific icons and adhering to design specs while maintaining reusability.

---

## Task 4: Filters

### Approach:

1. **State Management**: Created three states - `todoList`, `completedTaskList`, and `inCompleteTaskList` - to manage task data.

2. **Filter UI Design**: Designed a filter UI element, possibly using an icon or button.

3. **Modal Content**: Designed a modal component, `ModalContent`, with options to filter completed tasks, incompleted tasks, or cancel.

4. **Filter Functionality**: Implemented filter functionality:
   - "Completed Tasks" updates UI to show completed tasks.
   - "Incompleted Tasks" updates UI to show incomplete tasks.
   - "Cancel" closes the modal without applying filters.

---

## Task 5: Refactor, Improve, Enhance

### Approach:

1. **Code Formatting**: Utilized Prettier for consistent code formatting.

2. **Modularization**: Created reusable components (e.g., `Header`, `ModalContent`) for improved code structure and reusability.

3. **Helper Functions**: Introduced helpers like `apihandler`, `theme`, and `typography` to centralize common functionalities.

4. **Code Structure**: Enhanced code organization, enabling better navigation and scalability.

5. **Code Reusability**: Increased reusability through modular components and helper functions, facilitating future development.

---

## Bonus Task: Local Notifications

### Overview:

This bonus task aimed to implement local notifications for todo items with due dates, utilizing native APIs in Objective-C. The task also involved overcoming challenges for successful notification display.

### Approach:

1. **Objective-C Implementation**:

   - Created `LocalNotificationManager.m` for handling local notifications, incorporating essential libraries like `RCTConvert` and `UNUserNotificationCenter`.

2. **`scheduleNotification` Method**:

   - Exposed a native module method, `scheduleNotification`, to accept notification details (title, body, notification ID).
   - Configured notification content via `UNMutableNotificationContent`.

3. **Notification Request**:

   - Created a custom notification request (`UNNotificationRequest`) and attached the prepared content.
   - Added the request to the user notification center (`UNUserNotificationCenter`).

4. **Completion Handling**:

   - Implemented a completion handler that resolved or rejected promises based on successful or failed notification scheduling.
   - Provided suitable success or error messages in the resolution or rejection.

5. **Notification Display Issue**:

   - Faced the challenge of notifications not appearing initially.
   - Resolved this issue by implementing the `userNotificationCenter:willPresentNotification:withCompletionHandler:` delegate method in `delegate.m`, responsible for managing how notifications were presented.

6. **React Native Integration**:

   - Imported the native module into React Native code with `const { LocalNotificationManager } = NativeModules;`.

7. **Scheduling Notifications**:
   - Scheduled notifications for todo items based on their due dates, with a 1-minute delay for timely reminders.

### Challenges:

- Initial Notification Display Issue: Notifications were not initially appearing in the notification tray, requiring the implementation of the delegate method to address the presentation challenge.
