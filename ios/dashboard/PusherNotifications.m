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
//  RCTLogInfo(@"PusherNotificationsSubscribe: %@", intent);
  self.appDelegate = [[UIApplication sharedApplication] delegate];
  self.pusher = self.appDelegate.pusher;
  [[self.pusher nativePusher] subscribe:intent];
}

@end
