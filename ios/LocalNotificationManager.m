#import <Foundation/Foundation.h>
// LocalNotificationManager.m

#import "LocalNotificationManager.h"
#import <React/RCTConvert.h>
#import <React/RCTBridge.h>
#import <UIKit/UIKit.h>

@implementation LocalNotificationManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(scheduleNotification:(NSDictionary *)options
                resolver:(RCTPromiseResolveBlock)resolve
                rejecter:(RCTPromiseRejectBlock)reject)
{
    UNMutableNotificationContent *content = [UNMutableNotificationContent new];
    content.title = [RCTConvert NSString:options[@"title"]];
    content.body = [RCTConvert NSString:options[@"body"]];

  NSString *notificationId = [RCTConvert NSString:options[@"notificationId"]]; // Retrieve the custom notification ID    // Customize notification content as needed

  UNNotificationRequest *request = [UNNotificationRequest requestWithIdentifier:notificationId // Use the custom notification ID
                                                                           content:content
                                                                           trigger:nil];

    [[UNUserNotificationCenter currentNotificationCenter] addNotificationRequest:request withCompletionHandler:^(NSError * _Nullable error) {
        if (error) {
            reject(@"NOTIFICATION_ERROR", @"Failed to schedule notification", error);
        } else {
            resolve(@"Notification scheduled successfully");
        }
    }];
}

@end

