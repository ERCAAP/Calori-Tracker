# Kalori Tracker App - Development Rules

## Design System

### Color Palette
- Primary: Soft gradient from #FF6B6B to #FF8E53 (warm coral to orange)
- Secondary: #4ECDC4 to #45B7D1 (mint to blue gradient)
- Background: #FAFBFC (off-white)
- Card Background: #FFFFFF with subtle shadow
- Text Primary: #2D3748
- Text Secondary: #718096
- Success: #48BB78
- Warning: #ED8936
- Error: #E53E3E

### Typography
- Primary Font: System fonts (SF Pro on iOS, Roboto on Android)
- Headings: Inter/SF Pro Display (bold weights)
- Body: Inter/SF Pro Text (regular, medium)
- Numbers: Tabular figures for consistency

### Component Standards

#### Cards
- Border radius: 16px for main cards, 12px for secondary
- Shadow: subtle elevation (0px 2px 8px rgba(0,0,0,0.06))
- Padding: 20px for main content, 16px for compact
- Background: Pure white with subtle border

#### Buttons
- Primary: Gradient background, white text, 12px border radius
- Secondary: White background, colored border, colored text
- Icon buttons: 44px min touch target
- Loading states with subtle animations

#### Forms
- Input fields: 14px border radius, subtle border
- Focus states: colored border, no outline
- Validation: inline feedback with micro-animations

### Layout Principles
- Safe area handling for all devices
- 16px base margin/padding
- Consistent spacing scale: 4, 8, 16, 24, 32, 48px
- Flexible grid system

## Technical Architecture

### State Management
- React Context for global state
- useReducer for complex state logic
- Local state for component-specific data
- AsyncStorage for persistence

### Navigation
- React Navigation v6
- Stack navigators with custom transitions
- Tab navigation for main sections
- Modal presentations for forms

### Performance
- Image optimization and lazy loading
- List virtualization for large datasets
- Memoization for expensive calculations
- Bundle size optimization

## Feature Requirements

### Authentication
- Firebase Auth integration
- Apple Sign-In (iOS)
- Google Sign-In (cross-platform)
- Anonymous authentication fallback
- Secure token management

### Onboarding Flow
1. Welcome screen with app benefits
2. Authentication selection
3. Personal info collection (age, gender, activity level)
4. Goal setting (weight loss/gain/maintain)
5. Current stats (height, weight)
6. Preferences (units, notifications)

### Core Features
- Photo-based food logging with OpenAI Vision
- Manual food entry with search
- Calorie and macro tracking
- Progress visualization
- Daily/weekly/monthly reports
- Goal adjustment
- Water intake tracking
- Exercise integration

### Data Structure
```
users/{userId} {
  profile: {
    name, email, avatar, dateOfBirth, gender,
    height, currentWeight, goalWeight, activityLevel,
    preferences: { units, notifications, privacy }
  },
  goals: {
    dailyCalories, macroTargets, weeklyWeightGoal
  },
  entries/{date} {
    foods: [{ name, calories, macros, quantity, photoUrl, timestamp }],
    exercise: [{ type, duration, caloriesBurned, timestamp }],
    water: { amount, unit },
    weight: { value, unit, timestamp }
  },
  analytics: {
    weeklyAverages, monthlyTrends, achievements
  }
}
```

## UI/UX Guidelines

### Animations
- Entrance: Slide up with fade (300ms)
- Exit: Slide down with fade (250ms)
- Micro-interactions: Scale/opacity changes (150ms)
- Loading: Smooth skeleton screens
- Success feedback: Bounce animation

### Accessibility
- WCAG 2.1 AA compliance
- Voice-over support
- Minimum 44px touch targets
- High contrast mode support
- Dynamic text sizing

### Error Handling
- Graceful degradation
- Offline capability
- Retry mechanisms
- User-friendly error messages
- Loading states for all async operations

## Development Standards

### Code Quality
- TypeScript strict mode
- ESLint + Prettier configuration
- Component testing with Testing Library
- E2E testing for critical flows
- Performance monitoring

### File Structure
```
src/
├── components/           # Reusable UI components
├── screens/             # Screen components
├── navigation/          # Navigation configuration
├── services/           # API calls and business logic
├── hooks/              # Custom React hooks
├── utils/              # Helper functions
├── types/              # TypeScript type definitions
├── constants/          # App constants and config
└── assets/             # Images, fonts, etc.
```

### Component Naming
- PascalCase for components
- camelCase for functions and variables
- UPPER_CASE for constants
- Descriptive naming without abbreviations

## Security & Privacy
- Data encryption at rest
- Secure API communication (HTTPS)
- User data anonymization options
- GDPR compliance
- Minimal data collection principle
- Clear privacy policy integration 