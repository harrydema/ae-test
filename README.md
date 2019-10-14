#########
RUN PROJECT
#########

- Verify you have node installed on your machine.
- Verify you have the React Native cli installed on your machine.
- Verify you have Watchman installed on your machine

1. run
   `npm install`

2. run

For android:
`react-native run-android` o directly from Android Studio

For IOS:
`react-native run-ios` Or directly from XCode

##########
BUGFIXING
##########

- Problem between react native 0.55 and XCode 11

Unknown argument type 'attribute' in method -[RCTAppState getCurrentappState:error:]

- Go to node_modules/react-native/React/base/RCTModuleMethod.mm
- Replace the content of the function RCTParseUnused placed at line 93 with this:

```
return RCTReadString(input, "__attribute__((unused))") ||
         RCTReadString(input, "__attribute__((__unused__))") ||
         RCTReadString(input, "__unused");
```
