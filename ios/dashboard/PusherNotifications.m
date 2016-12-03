//
//  PusherNotifications.m
//  dashboard
//
//  Created by James Bradley on 30/11/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AppDelegate.h"
#import "PusherNotifications.h"
#import "RCTLog.h"

@implementation PusherNotifications


RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(subscribe:(NSString *)intent)
{
  self.application = [UIApplication sharedApplication];

  RCTLogInfo(@"Subscribing to intent: %@", intent);
  UIUserNotificationType notificationTypes = UIUserNotificationTypeAlert | UIUserNotificationTypeBadge | UIUserNotificationTypeSound;
  UIUserNotificationSettings *pushNotificationSettings = [UIUserNotificationSettings settingsForTypes:notificationTypes categories: NULL];
  [self.application registerUserNotificationSettings:pushNotificationSettings];
  [self.application registerForRemoteNotifications];
}

@end
