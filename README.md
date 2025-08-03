# Nexus

The goal of Nexus is to create a modern, performant Matrix client that provides an intuitive user experience while leveraging Matrix's decentralized, federated protocol. 
Nexus aims to deliver intuitive chat functionality with significantly lower resource usage compared to traditional clients whilst also being censorship resistant.

<img width="1276" height="910" alt="image" src="https://github.com/user-attachments/assets/6d50e860-48f2-4243-86f1-049106ecd857" />

## Current Status

Nexus is in active development with a working foundation:

- Server and channel navigation
- Basic interactive UI with proper styling
- State management architecture
- Component-based architecture

## Planned Features

- **Intuitive interface** with three-panel layout (servers, channels, chat)
- **Performance optimized** targeting less than 100MB RAM usage
- **Matrix protocol integration** with full federation support
- **Modern UI** using lightweight CSS modules and custom user themes

## Tech Stack

- **Frontend**: React 18+ with TypeScript and Vite
- **Backend**: Tauri 2.x with Rust for native performance
- **State Management**: Zustand for predictable state updates
- **Styling**: CSS Modules with custom properties for theming
- **Matrix Integration**: matrix-rust-sdk for protocol handling

### Project Structure

```
src/
├── components/          # React components
│   ├── layout/         # App layout components
│   ├── chat/           # Chat-related components
│   ├── server/         # Server/channel components
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── stores/             # Zustand state management
├── data/               # Mock data and utilities
├── utils/              # Helper functions
└── styles/             # Global styles and themes
```

## License

This project is licensed under the MIT License.
