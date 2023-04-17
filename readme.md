```mermaid
graph TD;
    EX[Express] --> Combine
    SOCKET[Socketio] --> Combine
    Combine --> API
    API --> Guilds
    Guilds --> RemoveMessage
    Guilds --> CreateMessage
```