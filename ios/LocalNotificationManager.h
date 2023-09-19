#import <React/RCTBridgeModule.h>
#import <UserNotifications/UserNotifications.h>

@interface LocalNotificationManager : NSObject <RCTBridgeModule, UNUserNotificationCenterDelegate>

@end

