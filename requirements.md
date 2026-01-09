# Pomodoro App Requirements

## Overview
A Pomodoro time management application with a unique twist: tracking total time spent on a task.

## Core Features

### 1. Timer
- **Pomodoro Timer**: Standard 25-minute work intervals (configurable in code initially).
- **Break Timer**: Short (5 min) and long (15 min) breaks.
- **Controls**: Start, Pause, Reset, Skip.
- **Visuals**: Clear visual indication of time remaining (e.g., circular progress or digital clock).

### 2. Task Management
- **Create Task**: User can define a task name.
- **Select Task**: Clicking a task in the list makes it active (Only allowed when timer is stopped).
- **Active Task**: Timer is always associated with an active task (or "Unallocated" if none selected).
- **Task List Display**: 
    - Shown on the side of the main timer.
    - Format: 
      ```
      Task Name
      spent: X min (Y min breaks)
      ```

### 3. Time Tracking (The "Twist")
- **Session Tracking**: Track time spent in the current Pomodoro session.
- **Total Time**: accumulatively track total productive time spent on each specific task.
- **Persistence**: Save task data and time logs (using LocalStorage for MVP).

### 4. Notifications & Alerts
- **Dynamic Title**: Browser tab title shows remaining time (e.g., "(12:30) Focus") for visibility in background.
- **System Notification**: Browser notification triggered when timer finishes.
- **Audio Alert**: Sound played when timer finishes.

## Technical Stack
- **Framework**: React
- **Language**: TypeScript (Strict mode enabled)
- **Styling**: Tailwind CSS
- **State Management**: React Context or Local State (start simple)
- **Data Persistence**: Browser LocalStorage

## UI/UX Design
- **Layout**: Single screen application.
    - **Center**: Active task name on top, Time remaining in center, Timer controls below.
    - **Side**: List of tasks with time stats.
- **Controls**: Dynamic buttons (e.g., Show "Pause" when running, "Start" when stopped).
- **Aesthetic**: Modern but sharp looking without too much rounded corners, and distraction-free.
- **Theme**: Support for Dark/Light mode.
    - **Light Mode**: White background, Purple accents.
    - **Dark Mode**: Dark background, Lighter Purple/Lavender accents.
- **Responsiveness**: Mobile and Desktop friendly.
